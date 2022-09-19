import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Hotel.css";
import useHotel from "../../hooks/useHotel";
import { useAppSelector } from "../../redux/hooks";
import React, { useState } from "react";
import Reserve from "../../components/reserve/Reserve";
import Spinner from "../../components/spinner/Spinner";

const Hotel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //get id of hotel from path
  const id = location.pathname.split("/")[2];
  // get dates from redux state
  const { dates, options } = useAppSelector((state) => state.searchOptions);
  //get users login status
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const [isModalopen, setIsModalOpen] = useState(false);
  //custom hook to get hotel data
  const { data, loading, error } = useHotel(id);

  //calculate difference (in days) between dates
  const dayDifference = (dates: string) => {
    const milisecondsPerDay = 1000 * 60 * 60 * 24;
    let difference = 0;
    if (dates) {
      const datesArray = dates.split("to");
      const timeDiff = Math.abs(
        new Date(datesArray[1]).getTime() - new Date(datesArray[0]).getTime()
      );
      difference = Math.ceil(timeDiff / milisecondsPerDay);
    }

    return difference;
  };
  const days = dayDifference(dates);

  const showModalHandler = () => {
    setIsModalOpen(!isModalopen);
  };

  const reserveHandler = () => {
    //if user is loggedIn, show reserve screen, else send to login page
    if (isLoggedIn) {
      showModalHandler();
    } else {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : error ? (
        <h3 style={{textAlign: "center", marginTop:"20px"}}>{error}</h3>
      ) : (
        data && (
          <div className="hotel-container">
            <h1 className="hotel-title">{data.name}</h1>
            <div className="hotel-address">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{data.address}</p>
            </div>
            <p className="hotel-info">
              Excellent location - {data.distance}m from center
            </p>
            <p className="hotel-info">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </p>
            <div className="hotel-imgs">
              {data.photos.map((photo, index) => (
                <div className="hotel-img-container" key={index}>
                  <img src={photo} className="hotel-img" alt="" />
                </div>
              ))}
            </div>
            <div className="hotel-details">
              <div className="hotel-details-texts">
                <h2>{data.title}</h2>
                <p className="hotel-desc">{data.desc}</p>
              </div>
              <div className="hotel-price">
                <h2>Perfect for a {days}-night stay!</h2>
                <p>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </p>
                <h3>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}
                  nights)
                </h3>
                <button onClick={reserveHandler}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        )
      )}
      {isModalopen && (
        <Reserve hotelId={id} showModalHandler={showModalHandler} />
      )}
    </React.Fragment>
  );
};

export default Hotel;
