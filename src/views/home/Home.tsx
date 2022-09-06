import React, { Fragment } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import PropertyList from "../../components/propertyList/PropertyList";
import HomesList from "../../components/homesList/HomesList";

const Home: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <div className="home-container">
        <Features />
        <h2 className="home-title">Home guests love</h2>
        <HomesList />
        <h2 className="home-title">Browse by Property</h2>
        <PropertyList />
      </div>
    </Fragment>
  );
};

export default Home;
