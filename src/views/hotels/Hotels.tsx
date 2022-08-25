import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./Hotels.css";
import { Options } from "../../types/types";
import SearchItem from "../../components/searchItem/SearchItem";
import useDestination from "../../hooks/useDestination";
import { useState } from "react";

interface StateProps {
  date: string;
  destination: string;
  optionsPicker: Options;
}

const Hotels: React.FC = () => {
  const useLocationProps = useLocation().state as StateProps;
  const [destination, setDestination] = useState(useLocationProps.destination);
  const [date, setDate] = useState(useLocationProps.date);
  const { data, error } = useDestination(destination);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleClick = () =>{
    
  }
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
              <input type="text" id="destination" placeholder={destination} />
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
                <input type="number" className="option-input" onChange={(e) => setMin(e.target.value)}/>
              </div>
              <div className="search-item-option">
                <p className="option-text">
                  Max price <small>per night</small>
                </p>
                <input type="number" className="option-input" onChange={(e) => setMax(e.target.value)}/>
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
            <button onClick={handleClick}>Seach</button>
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
