import React from "react";
import "./SearchItem.css";

const SearchItem = () => {
  return (
    <div className="search-item-container">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="search-item-img"
      />
      <div className="search-item-desc">
        <h2 className="item-desc-title">Tower Street Apartments</h2>
        <p>500m from center</p>
        <p className="item-desc-taxi">Free airport taxi</p>
        <p>
          Studio Apartment with Air conditioning
        </p>
        <p>
          Entire studio • 1 bathroom • 21m² 1 full bed
        </p>
        <p className="item-desc-cancel">Free cancellation </p>
        <p className="item-desc-cancel-subtitle">
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div className="search-item-details">
        <div className="search-item-rating">
          <p>Excellent</p>
          <span>8.9</span>
        </div>
        <div className="search-item-detail">
          <p className="search-item-price">$112</p>
          <p className="search-item-tax">Includes taxes and fees</p>
          <button className="search-item-button">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
