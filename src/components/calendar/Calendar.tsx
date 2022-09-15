import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange, Range } from "react-date-range";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import './Calendar.css';
interface CalendarPros {
  isdatePickerOpen: boolean;
  dates: Range[];
  showDatePickerHandler: () => void;
  datesHandler: (item:Range[]) => void
}

const Calendar: React.FC<CalendarPros> = ({isdatePickerOpen,dates,showDatePickerHandler,datesHandler}) => {
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
  return (
    <div className="header-search-item">
      <FontAwesomeIcon
        icon={faCalendarDays}
        className="header-icon"
        onClick={showDatePickerHandler}
      />
      <span className="header-search-text" onClick={showDatePickerHandler}>
        {formatDate(dates[0].startDate, dates[0].endDate)}
      </span>
      {isdatePickerOpen && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => datesHandler([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          minDate={new Date()}
          className="date-picker"
        />
      )}
    </div>
  );
};

export default Calendar;
