import "./FavoriteHotels.css";
import useFavoriteHotels from "../../hooks/useFavoriteHotels";
import Spinner from "../spinner/Spinner";

const FavoriteHotels: React.FC = () => {
  //custom hook to get list of hotels
  const { data, loading, error } = useFavoriteHotels();
  return (
    <div className="home-list-container">
      {loading ? (
        <Spinner />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        data.map((item, index) => (
          <div className="home-list-item" key={index}>
            <img src={item.photos[0]} alt="" className="home-list-img" />
            <p>{item.name}</p>
            <p>{item.city}</p>
            <p>Starting from ${item.cheapestPrice}</p>
            <div className="home-list-ratings">
              <span>{item.rating}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteHotels;
