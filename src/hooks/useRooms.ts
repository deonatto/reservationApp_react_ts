import { useEffect, useState } from "react";
import axios from "axios";
import { Room } from "../types/types";

export default function useRooms(hotelId:string) {
  const [data, setData] = useState<Room[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/hotels/room/${hotelId}`
        );
        setData(res.data);
        console.log(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      }
    };
    fechData();
  }, [hotelId]);
  return { data, error };
}