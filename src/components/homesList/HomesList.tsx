import React from "react";
import "./HomesList.css";
import useFavoriteHotels from "../../hooks/useFavoriteHotels";

const HomesList = () => {
  const { data, error } = useFavoriteHotels();

  return (
    <div className="home-list-container">
      {error ? (
        error
      ) : (
        <div className="home-list-item">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            className="home-list-img"
          />
          <p>Aparthotel Stare Miasto</p>
          <p>Madrid</p>
          <p>Starting from $120</p>
          <div className="home-list-ratings">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomesList;
