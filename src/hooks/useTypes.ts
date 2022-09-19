import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../types/types";

interface PropertyType{
    type:string,
    count:number
}

export default function useTypes() {
  const [data, setData] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://reservationappapi-production.up.railway.app/api/hotels/countByType`
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
  }, []);
  return { data, loading, error };
}