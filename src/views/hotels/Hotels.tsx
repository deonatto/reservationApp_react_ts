import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Hotels.css";
import SearchItem from "../../components/searchItem/SearchItem";
import useHotels from "../../hooks/useHotels";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { searchOptionsActions } from "../../redux/searchOptions";
import Spinner from "../../components/spinner/Spinner";
import SearchTab from "../../components/searchTab/SearchTab";

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
    `${process.env.REACT_APP_API_URL}/api/hotels?city=${destination.toLocaleLowerCase()}`
  );
  //custom hook to get hotels in destination
  const { data, loading, error } = useHotels(url);

  //function to update options state
  const optionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prevState) => ({
      ...prevState,
      [e.target.id]: Number(e.target.value),
    }));
  };

  const destinationHandler = (destination: string) => {
    setDestination(destination);
  };

  const minPriceHandler = (minPrice: string) => {
    setMinPrice(minPrice);
  };

  const maxPriceHandler = (maxPrice: string) => {
    setMaxPrice(maxPrice);
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
          <SearchTab
            destination={destination}
            date={date}
            options={options}
            destinationHandler={destinationHandler}
            optionsHandler={optionsHandler}
            minPriceHandler={minPriceHandler}
            maxPriceHandler={maxPriceHandler}
            searchHandler={searchHandler}
          />
          <div className="list-result">
            {loading ? (
              <Spinner />
            ) : error ? (
              <h3 style={{ textAlign: "center" }}>{error}</h3>
            ) : data.length > 0 ? (
              data.map((item) => <SearchItem key={item._id} item={item} />)
            ) : (
              <h3 style={{ textAlign: "center" }}>No hotels found</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
