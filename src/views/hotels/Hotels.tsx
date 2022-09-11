import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Hotels.css";
import SearchItem from "../../components/searchItem/SearchItem";
import useHotels from "../../hooks/useHotels";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { searchOptionsActions } from "../../redux/searchOptions";

const Hotels: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  //set initial value to location inserted by user in home page search bar
  const [destination, setDestination] = useState(
    location.pathname.split("/")[2]
  );
  //get date from redux state
  const date = useAppSelector((state) => state.searchOptions.dates);
  const [options, setOptions] = useState(
    useAppSelector((state) => state.searchOptions.options)
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [url, setUrl] = useState(
    `http://localhost:8800/api/hotels?city=${destination.toLocaleLowerCase()}`
  );
  //custom hook to get hotels in destination
  const { data, error } = useHotels(url);

  //function to update options state
  const optionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prevState) => ({
      ...prevState,
      [e.target.id]: Number(e.target.value),
    }));
  };
  //function to allow only positive integers in input
  const checkPositiveInteger = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[0-9"Backspace"]*$/;
    //if input is not a number validates to true
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const searchHandler = () => {
    //dispatch action to update redux options state
    dispatch(searchOptionsActions.setOptionsQuantity(options));
    //set new url with new data, to get new list of hotels
    setUrl(
      `http://localhost:8800/api/hotels?city=${destination.toLocaleLowerCase()}&min=${minPrice}&max=${maxPrice}`
    );
  };
  return (
    <div>
      <Navbar />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h2 className="list-search-title">Search</h2>
            <div className="list-search-item">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
              />
            </div>
            <div className="list-search-item">
              <label htmlFor="check-in">Check-in Date</label>
              <p id="check-in" className="item-date">
                {date}
              </p>
            </div>
            <div className="list-search-item">
              <h3>Options</h3>
              <div className="search-item-option">
                <p className="option-text">
                  Min price <small>per night</small>
                </p>
                <input
                  type="number"
                  min="0"
                  className="option-input"
                  onChange={(e) => setMinPrice(e.target.value)}
                  onKeyDown = {checkPositiveInteger}
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
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onKeyDown = {checkPositiveInteger}
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
                  onKeyDown = {checkPositiveInteger}
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
                  onKeyDown = {checkPositiveInteger}
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
                  onKeyDown = {checkPositiveInteger}
                  placeholder={String(options.room)}
                />
              </div>
            </div>
            <button onClick={searchHandler}>Seach</button>
          </div>
          <div className="list-result">
            {error
              ? error
              : data.map((item) => <SearchItem key={item._id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
