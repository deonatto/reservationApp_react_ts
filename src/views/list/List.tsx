import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./List.css";
import { Options } from "../../types/types";
import SearchItem from "../../components/searchItem/SearchItem";

interface StateProps {
  date: string;
  destination: string;
  optionsPicker: Options;
}

const List = () => {
  const data = useLocation().state as StateProps;
  console.log(data);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h2 className="list-search-title">Search</h2>
            <div className="list-search-item">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                placeholder={data.destination}
              />
            </div>
            <div className="list-search-item">
              <label htmlFor="check-in">Check-in Date</label>
              <p id="check-in" className="item-date">{data.date}</p>
            </div>
            <div className="list-search-item">
              <h3>Options</h3>
              <div className="search-item-option">
                <p className="option-text">
                  Min price <small>per night</small>
                </p>
                <input type="number" className="option-input" />
              </div>
              <div className="search-item-option">
                <p className="option-text">
                  Max price <small>per night</small>
                </p>
                <input type="number" className="option-input" />
              </div>
              <div className="search-item-option">
                <p className="option-text">Adults</p>
                <input type="number" className="option-input" />
              </div>
              <div className="search-item-option">
                <p className="option-text">Childrens</p>
                <input type="number" className="option-input" />
              </div>
              <div className="search-item-option">
                <p className="option-text">Rooms</p>
                <input type="number" className="option-input" />
              </div>
            </div>
            <button>Seach</button>
          </div>
          <div className="list-result">
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
