import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Reserve.css";
import useRoom from "../../hooks/useRooms";
import { useAppSelector } from "../../redux/hooks";
import axios, { AxiosError } from "axios";

interface ReserveProps {
  hotelId: string;
  showModalHandler: () => void;
}

const Reserve: React.FC<ReserveProps> = ({ hotelId, showModalHandler }) => {
  //custom hook to get rooms information
  const { data, error } = useRoom(hotelId);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const dates = useAppSelector((state) => state.searchOptions.dates);

  //function to get an array of all days within range date selected by user
  //the array is an array of numbers, the dates are converted to numbers
  const getDatesInRange = () => {
    const datesArray = dates.split("to");
    //create start and end dates
    const startDate = new Date(datesArray[0]);
    const endDate = new Date(datesArray[1]);
    let datesList = [];
    //loop throught all days
    while (startDate.getTime() <= endDate.getTime()) {
      //push current day
      datesList.push(new Date(startDate).getTime());
      //set new date to tomorrow
      startDate.setDate(startDate.getDate() + 1);
    }
    return datesList;
  };
  //array with dates selected by user
  const allDates = getDatesInRange();

  //check if room is available on dates selected by user
  const isRoomAvailable = (unavailableDates: string[]) => {
    const isFound = unavailableDates.some((item) => {
      //create date with string of day
      const date = new Date(item);
      //check if unavailable date exits on days selected by user
      return allDates.includes(date.getTime());
    });
    return !isFound;
  };

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    // if checkbox is checked, add value(room id) to array
    // if it is not checked, then create new array without that value
    setSelectedRooms((prevState) =>
      checked
        ? [...prevState, e.target.value]
        : prevState.filter((item) => item !== e.target.value)
    );
  };
  const reserveHandler = async () => {
    try {
      for (const room of selectedRooms) {
        await axios.put(
          `http://localhost:8800/api/rooms/availability/${room}`,
          {
            dates: allDates,
          }
        );
      }
      showModalHandler();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
    }
  };
  return (
    <div className="reserve-container">
      <div className="reserve-wrapper">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-icon"
          onClick={showModalHandler}
        />

        <h3>Select your rooms:</h3>
        {error
          ? error
          : data &&
            data.map((item) => (
              <React.Fragment>
                <div className="room-container" key={item._id}>
                  <div className="room-info">
                    <p>
                      <b>{item.title}</b>
                    </p>
                    <p>{item.desc}</p>
                    <p>
                      Max people: <b>{item.maxPeople}</b>
                    </p>
                  </div>
                  <div className="room-numbers-container">
                    {item.roomNumbers.map((roomNumber) => (
                      <div
                        className="room-numbers-wrapper"
                        key={roomNumber._id}
                      >
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={selectHandler}
                          disabled={
                            !isRoomAvailable(roomNumber.unavailableDates)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button className="reserve-btn" onClick={reserveHandler}>
                  Reserve Now!
                </button>
              </React.Fragment>
            ))}
      </div>
    </div>
  );
};

export default Reserve;
