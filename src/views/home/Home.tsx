import React, { Fragment } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import FavoriteDestinations from "../../components/favoriteDestinations/FavoriteDestinations";
import PropertyList from "../../components/propertyList/PropertyList";
import FavoriteHotels from "../../components/favoriteHotels/FavoriteHotels";

const Home: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <div className="home-container">
        <FavoriteDestinations />
        <h2 className="home-title">Home guests love</h2>
        <FavoriteHotels />
        <h2 className="home-title">Browse by Property</h2>
        <PropertyList />
      </div>
    </Fragment>
  );
};

export default Home;
