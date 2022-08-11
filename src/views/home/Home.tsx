import React, { Fragment } from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Features from '../../components/features/Features';
const Home: React.FC = () => {
  return (
    <Fragment>
        <Navbar/>
        <Header/>
        <div className='home-container'>
          <Features/>
          <h2 className='home-title'>Browse by property type</h2>
        </div>
    </Fragment>
  )
}

export default Home;