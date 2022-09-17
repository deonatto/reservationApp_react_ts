import React from "react";
import { Options } from "../../types/types";
import './SearchTab.css';

interface SearchTabProps {
  destination: string;
  date: string;
  options: Options;
  destinationHandler: (destination: string) => void;
  optionsHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minPriceHandler: (minPrice: string) => void;
  maxPriceHandler: (maxPrice: string) => void;
  searchHandler: () => void;
}

const SearchTab: React.FC<SearchTabProps> = ({
  destination,
  date,
  options,
  destinationHandler,
  optionsHandler,
  minPriceHandler,
  maxPriceHandler,
  searchHandler,
}) => {
  //function to allow only positive integers in input
  const checkPositiveInteger = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[0-9"Backspace"]*$/;
    //if input is not a number validates to true
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="search-tab-container">
      <h2 className="search-tab-title">Search</h2>
      <div className="search-tab-item">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          onChange={(e) => destinationHandler(e.target.value)}
          placeholder={destination}
        />
      </div>
      <div className="search-tab-item">
        <label htmlFor="check-in">Check-in Date</label>
        <p id="check-in" className="item-date">
          {date}
        </p>
      </div>
      <div className="search-tab-item">
        <h3>Options</h3>
        <div className="search-item-option">
          <p className="option-text">
            Min price <small>per night</small>
          </p>
          <input
            type="number"
            min="0"
            className="option-input"
            onChange={(e) => minPriceHandler(e.target.value)}
            onKeyDown={checkPositiveInteger}
          />
        </div>
        <div className="search-item-option">
          <p className="option-text">
            Max price <small>per night</small>
          </p>
          <input
            type="number"
            min="0"
            className="option-input"
            onChange={(e) => maxPriceHandler(e.target.value)}
            onKeyDown={checkPositiveInteger}
          />
        </div>
        <div className="search-item-option">
          <p className="option-text">Adults</p>
          <input
            type="number"
            min="0"
            className="option-input"
            id="adult"
            onChange={(e) => optionsHandler(e)}
            onKeyDown={checkPositiveInteger}
            placeholder={String(options.adult)}
          />
        </div>
        <div className="search-item-option">
          <p className="option-text">Childrens</p>
          <input
            type="number"
            min="0"
            className="option-input"
            id="children"
            onChange={(e) => optionsHandler(e)}
            onKeyDown={checkPositiveInteger}
            placeholder={String(options.children)}
          />
        </div>
        <div className="search-item-option">
          <p className="option-text">Rooms</p>
          <input
            type="number"
            min="0"
            className="option-input"
            id="room"
            onChange={(e) => optionsHandler(e)}
            onKeyDown={checkPositiveInteger}
            placeholder={String(options.room)}
          />
        </div>
      </div>
      <button onClick={searchHandler}>Seach</button>
    </div>
  );
};

export default SearchTab;
