import { useEffect, useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import { Hotel } from "../types/types";

export default function useHotels(url:string) {
  const [data, setData] = useState<Hotel[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          url
        );
        setData(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      }
    };
    fechData();
  }, [url]);
  return { data, error };
}