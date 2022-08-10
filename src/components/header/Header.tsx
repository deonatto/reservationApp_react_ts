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
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {format} from 'date-fns';

const Header = () => {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [optionsPickerIsOpen, setOptionsPickerIsOpen] = useState(false);
  //initialize dates for date range
  const [date, setDate] = useState<Range[]>([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]);

  //function to return formated date
  const formatDate = (startDate: Date | undefined, endDate: Date | undefined):string =>{
    let formatedDate="";
    if(startDate && endDate){
      const startDateFormated = format(startDate,"MM/dd/yyyy");
      const endDateFormated = format(endDate,"MM/dd/yyyy");
      formatedDate = startDateFormated + " to " + endDateFormated;
    }
    return formatedDate;
  }

  return (
    <div className="header-container">
      <ul className="categories-list">
        <li className="category active">
          <FontAwesomeIcon icon={faBed} className="header-icon" />
          Stays
        </li>
        <li className="category">
          <FontAwesomeIcon icon={faPlane} className="header-icon" />
          Flights
        </li>
        <li className="category">
          <FontAwesomeIcon icon={faCar} className="header-icon" />
          Car rentals
        </li>
        <li className="category">
          <FontAwesomeIcon icon={faBed} className="header-icon" />
          Attractions
        </li>
        <li className="category">
          <FontAwesomeIcon icon={faTaxi} className="header-icon" />
          Airport taxis
        </li>
      </ul>
      <h1 className="header-title">A lifetime of discounts? It´s Genius</h1>
      <p className="header-text">
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free account
      </p>
      <button className="header-btn">Sign in/Register</button>
      <div className="header-search">
        <div className="header-search-item">
          <FontAwesomeIcon icon={faBed} className="header-icon" />
          <input
            type="text"
            placeholder="where are you goin?"
            className="header-search-input"
          />
        </div>
        <div className="header-search-item">
          <FontAwesomeIcon icon={faCalendarDays} className="header-icon" onClick={()=>setDatePickerIsOpen(!datePickerIsOpen)}/>
          <span className="header-search-text">{formatDate(date[0].startDate, date[0].endDate)}</span>
          {datePickerIsOpen && <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date-picker"
          />}
        </div>
        <div className="header-search-item">
          <FontAwesomeIcon icon={faPerson} className="header-icon" />
          <span className="header-search-text">2 adults 2 childrens</span>
        </div>
        <div className="header-search-item">
          <button className="header-search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
