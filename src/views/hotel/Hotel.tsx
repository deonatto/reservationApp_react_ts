import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Hotel.css";
import useHotel from "../../hooks/useHotel";
import { useAppSelector } from "../../redux/hooks";
import React, { useState } from "react";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const { dates, options } = useAppSelector((state) => state.searchOptions);
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const { data, error } = useHotel(id);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(!showModal);
  };

  const reserveHandler = () => {
    if (isLoggedIn) {
      showModalHandler();
    } else {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      {error
        ? error
        : data && (
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
                Book a stay over ${data.cheapestPrice} at this property and get
                a free airport taxi
              </p>
              <div className="hotel-imgs">
                {photos.map((photo, index) => (
                  <div className="hotel-img-container" key={index}>
                    <img src={photo.src} className="hotel-img" alt="" />
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
          )}
      {showModal && (
        <Reserve hotelId={id} showModalHandler={showModalHandler} />
      )}
    </React.Fragment>
  );
};

export default Hotel;
