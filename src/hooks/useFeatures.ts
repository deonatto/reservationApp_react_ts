import { useEffect, useState } from "react";
import axios from "axios";

export default function useFeatures() {
  const [data, setData] = useState<number[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/hotels/countByCity?cities=berlin,madrid,london"
        );
        setData(res.data);
      } catch (err) {
        if(axios.isAxiosError(err)){
            setError(err.message)
        }
      }
    };
    fechData();
  }, []);
  return { data, error };
}
