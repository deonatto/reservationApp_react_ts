import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Reserve.css";
import useRoom from "../../hooks/useRooms";

interface ReserveProps {
  hotelId: string;
  showModalHandler: () => void;
}

const Reserve: React.FC<ReserveProps> = ({ hotelId, showModalHandler }) => {
  const { data, error } = useRoom(hotelId);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    // if checkbox is checked, add value to array
    // if it is not checked, then create new array without that value
    setSelectedRooms((prevState) => 
      checked
        ? [...prevState, e.target.value]
        : prevState.filter((item) => item !== e.target.value)
    );
  };
  const reserveHandler = () =>{
    
  }
  return (
    <div className="reserve-container">
      <div className="reserve-wrapper">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-icon"
          onClick={showModalHandler}
        />
      </div>
      <p>Select your rooms</p>
      {data &&
        data.map((item) => (
          <div className="room-container" key={item._id}>
            <div className="room-info">
              <div className="room-title">{item.title}</div>
              <div className="room-desc">{item.desc}</div>
              <div className="room-max">Max people: {item.maxPeople}</div>
              <div className="room-price">Max people: {item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber) => (
              <div className="room-numbers-container" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={selectHandler}
                />
              </div>
            ))}
          </div>
        ))}
        <button className="reserve-btn" onClick={reserveHandler}>Reserve Now!</button>
    </div>
  );
};

export default Reserve;
