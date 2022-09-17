import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { Range } from "react-date-range";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { Options } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { searchOptionsActions } from "../../redux/searchOptions";
import Calendar from "../calendar/Calendar";
import ReservationOptions from "../reservationOptions/ReservationOptions";
import { format } from "date-fns";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [destination, setDestination] = useState("");
  const [isdatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isOptionsPickerOpen, setIsOptionsPickerOpen] = useState(false);
  const [options, setOptions] = useState<Options>({
    adult: 0,
    children: 0,
    room: 0,
  });
  //initialize dates for date range
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //function to return formated date
  const formatDate = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ): string => {
    let formatedDate = "";
    if (startDate && endDate) {
      const startDateFormated = format(startDate, "MM/dd/yyyy");
      const endDateFormated = format(endDate, "MM/dd/yyyy");
      formatedDate = startDateFormated + " to " + endDateFormated;
    }
    return formatedDate;
  };

  //handler function to update dates
  const datesHandler = (item: Range[]) => {
    setDates((prevState) =>
      prevState.map((stateObj) => ({
        ...stateObj,
        startDate: item[0].startDate,
        endDate: item[0].endDate,
      }))
    );
  };

  // handler function to show and hide reservation options
  const optionsPickerHandler = () =>{
    setIsOptionsPickerOpen(!isOptionsPickerOpen)
  }

  // handler function to show and hide calendar
  const datePickerHandler = () => {
    setIsDatePickerOpen(!isdatePickerOpen);
  };

  //update count of options (adults, childs and rooms)
  const optionsHandler = (option: string, operator: string) => {
    switch (option) {
      case "adult":
        setOptions((prevState) => {
          return {
            ...prevState,
            adult: operator === "-" ? prevState.adult - 1 : prevState.adult + 1,
          };
        });
        break;
      case "children":
        setOptions((prevState) => {
          return {
            ...prevState,
            children:
              operator === "-"
                ? prevState.children - 1
                : prevState.children + 1,
          };
        });
        break;
      case "room":
        setOptions((prevState) => {
          return {
            ...prevState,
            room: operator === "-" ? prevState.room - 1 : prevState.room + 1,
          };
        });
        break;
      default:
        break;
    }
  };

  //get data inserted by user and send to page with list of hotels
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (destination) {
      //dispatch to update redux state of dates and options
      dispatch(
        searchOptionsActions.newSearch({
          dates: formatDate(dates[0].startDate, dates[0].endDate),
          options,
        })
      );
      //send to hotels page
      navigate(`/hotels/${destination}`);
    } else {
      alert("Please insert destination");
    }
  };

  return (
    <div className="header-container">
      <h1 className="header-title">A lifetime of discounts? It´s Genius</h1>
      <p className="header-text">
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free account
      </p>
      <div className="header-search">
        <div className="header-search-item">
          <FontAwesomeIcon icon={faBed} className="header-icon" />
          <input
            type="text"
            placeholder="Country"
            className="header-search-input"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="header-search-item">
          <Calendar
            dates={dates}
            isdatePickerOpen={isdatePickerOpen}
            datePickerHandler={datePickerHandler}
            datesHandler={datesHandler}
          />
        </div>
        <div className="header-search-item">
          <ReservationOptions
            options={options}
            optionsHandler={optionsHandler}
            isOptionsPickerOpen={isOptionsPickerOpen}
            optionsPickerHandler = {optionsPickerHandler }
          />
        </div>
        <div className="header-search-item">
          <button className="header-search-btn" onClick={clickHandler}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
