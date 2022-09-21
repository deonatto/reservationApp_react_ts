import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Hotel, ErrorResponse } from "../types/types";

export default function useHotel(id:string) {
  const [data, setData] = useState<Hotel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/hotels/find/${id}`
        );
        setData(res.data);
        setLoading(false);
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
        setLoading(false);
      }
    };
    fechData();
  }, [id]);
  return { data, loading, error };
}