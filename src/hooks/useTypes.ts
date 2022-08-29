import { useEffect, useState } from "react";
import axios from "axios";

interface PropertyType{
    type:string,
    count:number
}

export default function useTypes() {
  const [data, setData] = useState<PropertyType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/hotels/countByType`
        );
        setData(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      }
    };
    fechData();
  }, []);
  return { data, error };
}