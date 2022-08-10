import React, { Fragment } from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

const Home: React.FC = () => {
  return (
    <Fragment>
        <Navbar/>
        <Header/>
    </Fragment>
  )
}

export default Home;