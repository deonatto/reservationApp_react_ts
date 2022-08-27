import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./Hotel.css";
import useHotel from "../../hooks/useHotel";

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
  const id = location.pathname.split("/")[2];
  const { data, error } = useHotel(id);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {error ? (
        error
      ) : data && (
        <div className="hotel-container">
          <div className="hotel-wrapper">
            <h1 className="hotel-title">{data.name}</h1>
            <div className="hotel-address">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{data.address}</p>
            </div>
            <p className="hotel-info">Excellent location - {data.distance}m from center</p>
            <p className="hotel-info">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
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
                <p className="hotel-desc">
                  {data.desc}
                </p>
              </div>
              <div className="hotel-price">
                <h2>Perfect for a 9-night stay!</h2>
                <p>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </p>
                <h3>
                  <b>$945</b> (9 nights)
                </h3>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Hotel;
