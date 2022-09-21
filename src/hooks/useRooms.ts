import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Room, ErrorResponse } from "../types/types";

export default function useRooms(hotelId:string) {
  const [data, setData] = useState<Room[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/hotels/room/${hotelId}`
        );
        setData(res.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorResponse = err.response?.data as ErrorResponse;
          setError(errorResponse.message);
        }else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          setError("Something went wrong");
        }
      }
    };
    fechData();
  }, [hotelId]);
  return { data, error };
}