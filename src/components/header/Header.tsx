import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange, Range } from "react-date-range";
import React, { Fragment, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Options } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { searchOptionsActions } from "../../redux/searchOptions";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [destination, setDestination] = useState("");
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [optionsPickerIsOpen, setOptionsPickerIsOpen] = useState(false);
  const [optionsPicker, setOptionsPicker] = useState<Options>({
    adult: 0,
    children: 0,
    room: 0,
  });
  //initialize dates for date range
  const [date, setDate] = useState<Range[]>([
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

  //update count of options(adults, childs and rooms)
  const handleCounter = (option: string, operator: string) => {
    switch (option) {
      case "adult":
        setOptionsPicker((prevState) => {
          return {
            ...prevState,
            adult: operator === "-" ? prevState.adult - 1 : prevState.adult + 1,
          };
        });
        break;
      case "children":
        setOptionsPicker((prevState) => {
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
        setOptionsPicker((prevState) => {
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

  const handleSearch = () => {
    dispatch(
      searchOptionsActions.newSearch({
        dates: formatDate(date[0].startDate, date[0].endDate),
        options: optionsPicker,
      })
    );
    navigate("/hotels", {
      state: {
        destination,
        date: formatDate(date[0].startDate, date[0].endDate),
        optionsPicker,
      },
    });
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
          />
        </div>
        <div className="header-search-item">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="header-icon"
            onClick={() => setDatePickerIsOpen(!datePickerIsOpen)}
          />
          <span className="header-search-text">
            {formatDate(date[0].startDate, date[0].endDate)}
          </span>
          {datePickerIsOpen && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
              className="date-picker"
            />
          )}
        </div>
        <div className="header-search-item">
          <FontAwesomeIcon icon={faPerson} className="header-icon" />
          <span
            className="header-search-text"
            onClick={() => setOptionsPickerIsOpen(!optionsPickerIsOpen)}
          >
            {`${optionsPicker.adult} Adult - ${optionsPicker.children} Children - ${optionsPicker.room} Room`}
          </span>
          {optionsPickerIsOpen && (
            <div className="header-options">
              <div className="header-option-item">
                <span className="header-option-text">Adult</span>
                <div className="header-counter-container">
                  <button
                    disabled={optionsPicker.adult < 1}
                    className="header-counter-btn"
                    onClick={() => handleCounter("adult", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {optionsPicker.adult}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => handleCounter("adult", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="header-option-item">
                <span className="header-option-text">Children</span>
                <div className="header-counter-container">
                  <button
                    disabled={optionsPicker.children < 1}
                    className="header-counter-btn"
                    onClick={() => handleCounter("children", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {optionsPicker.children}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => handleCounter("children", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="header-option-item">
                <span className="header-option-text">Room</span>
                <div className="header-counter-container">
                  <button
                    disabled={optionsPicker.room < 1}
                    className="header-counter-btn"
                    onClick={() => handleCounter("room", "-")}
                  >
                    -
                  </button>
                  <span className="header-counter-number">
                    {optionsPicker.room}
                  </span>
                  <button
                    className="header-counter-btn"
                    onClick={() => handleCounter("room", "+")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="header-search-item">
          <button className="header-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
