import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Hotel, ErrorResponse } from "../types/types";

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
  }, [id]);
  return { data, error };
}