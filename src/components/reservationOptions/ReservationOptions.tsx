import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { Options } from "../../types/types";
import "./ReservationOptions.css";

interface OptionsProps {
  options: Options;
  isOptionsPickerOpen: boolean;
  optionsHandler: (option: string, operator: string) => void;
  optionsPickerHandler: () => void;
}

const ReservationOptions: React.FC<OptionsProps> = ({
  options,
  isOptionsPickerOpen,
  optionsHandler,
  optionsPickerHandler,
}) => {
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faPerson} className="header-icon" />
      <span className="header-search-text" onClick={optionsPickerHandler}>
        {`${options.adult} Adult - ${options.children} Children - ${options.room} Room`}
      </span>
      {isOptionsPickerOpen && (
        <div className="reservation-options-container">
          <div className="reservation-option-item">
            <span className="option-item-text">Adult</span>
            <div className="option-item-counter">
              <button
                disabled={options.adult < 1}
                className="counter-btn"
                onClick={() => optionsHandler("adult", "-")}
              >
                -
              </button>
              <span className="counter-number">{options.adult}</span>
              <button
                className="counter-btn"
                onClick={() => optionsHandler("adult", "+")}
              >
                +
              </button>
            </div>
          </div>
          <div className="reservation-option-item">
            <span className="option-item-text">Children</span>
            <div className="option-item-counter">
              <button
                disabled={options.children < 1}
                className="counter-btn"
                onClick={() => optionsHandler("children", "-")}
              >
                -
              </button>
              <span className="counter-number">{options.children}</span>
              <button
                className="counter-btn"
                onClick={() => optionsHandler("children", "+")}
              >
                +
              </button>
            </div>
          </div>
          <div className="reservation-option-item">
            <span className="option-item-text">Room</span>
            <div className="option-item-counter">
              <button
                disabled={options.room < 1}
                className="counter-btn"
                onClick={() => optionsHandler("room", "-")}
              >
                -
              </button>
              <span className="counter-number">{options.room}</span>
              <button
                className="counter-btn"
                onClick={() => optionsHandler("room", "+")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ReservationOptions;
