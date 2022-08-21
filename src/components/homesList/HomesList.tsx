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
                src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
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
