import "./HomesList.css";
import useFavoriteHotels from "../../hooks/useFavoriteHotels";

const HomesList = () => {
  const { data, error } = useFavoriteHotels();
  return (
    <div className="home-list-container">
      {error
        ? error
        : data.map((item, index) => (
            <div className="home-list-item" key={index}>
              <img
                src={item.photos[0]}
                alt=""
                className="home-list-img"
              />
              <p>{item.name}</p>
              <p>{item.city}</p>
              <p>Starting from ${item.cheapestPrice}</p>
              <div className="home-list-ratings">
                <span>{item.rating}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default HomesList;
