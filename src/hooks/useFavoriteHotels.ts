import { useEffect, useState } from "react";
import axios from "axios";



export default function useFavoriteHotels() {
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/hotels?featured=true&limit=4`
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      }
    };
    fechData();
  }, []);
  return { data, error };
}