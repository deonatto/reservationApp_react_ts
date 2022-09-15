import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { Range } from "react-date-range";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { Options } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { searchOptionsActions } from "../../redux/searchOptions";
import Calendar from "../calendar/Calendar";
import { format } from "date-fns";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [destination, setDestination] = useState("");
  const [isdatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [optionsPickerIsOpen, setOptionsPickerIsOpen] = useState(false);
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
  const formatDate = (startDate: Date | undefined, endDate: Date | undefined): string => {
    let formatedDate = "";
    if (startDate && endDate) {
      const startDateFormated = format(startDate, "MM/dd/yyyy");
      const endDateFormated = format(endDate, "MM/dd/yyyy");
      formatedDate = startDateFormated + " to " + endDateFormated;
    }
    return formatedDate;
  };

  //handler function to update dates 
  const datesHandler = (item:Range[]) =>{
    setDates((prevState)=>(
      prevState.map(stateObj=>(
        {...stateObj, startDate: item[0].startDate, endDate: item[0].endDate}
      ))
    ));
  }
  // handler function to show and hide calendar
  const showDatePickerHandler = () =>{
    setIsDatePickerOpen(!isdatePickerOpen)
  }

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //dispatch to update redux state
    dispatch(
      searchOptionsActions.newSearch({
        dates: formatDate(dates[0].startDate, dates[0].endDate),
        options,
      })
    );
    //send to hotels page
    navigate(`/hotels/${destination}`);
  };

  return (
    <div className="header-container">
      <h1 className="header-title">A lifetime of discounts? It´s Genius</h1>
      <p className="header-text">
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free account
      </p>
      <form className="header-search" onSubmit={submitHandler}>
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
        <Calendar 
          dates={dates} 
          isdatePickerOpen={isdatePickerOpen} 
          showDatePickerHandler={showDatePickerHandler}
          datesHandler={datesHandler}
        />
        <div className="header-search-item">
          <FontAwesomeIcon icon={faPerson} className="header-icon" />
          <span
            className="header-search-text"
            onClick={() => setOptionsPickerIsOpen(!optionsPickerIsOpen)}
          >
            {`${options.adult} Adult - ${options.children} Children - ${options.room} Room`}
          </span>
          {optionsPickerIsOpen && (
            <div className="header-options">
              <div className="header-option-item">
                <span className="header-option-text">Adult</span>
                <div className="header-counter-container">
                  <button
                    disabled={options.adult < 1}
                    className="header-counter-btn"
                    onClick={() => optionsHandler("adult", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {options.adult}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => optionsHandler("adult", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="header-option-item">
                <span className="header-option-text">Children</span>
                <div className="header-counter-container">
                  <button
                    disabled={options.children < 1}
                    className="header-counter-btn"
                    onClick={() => optionsHandler("children", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {options.children}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => optionsHandler("children", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="header-option-item">
                <span className="header-option-text">Room</span>
                <div className="header-counter-container">
                  <button
                    disabled={options.room < 1}
                    className="header-counter-btn"
                    onClick={() => optionsHandler("room", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {options.room}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => optionsHandler("room", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="header-search-item">
          <button className="header-search-btn" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
