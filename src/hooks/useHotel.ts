import { useEffect, useState } from "react";
import axios from "axios";
import { Hotel } from "../types/types";

export default function useHotel(id:string) {
  const [data, setData] = useState<Hotel>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/hotels/find/${id}`
        );
        setData(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      }
    };
    fechData();
  }, [id]);
  return { data, error };
}