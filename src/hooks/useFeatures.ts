import { useEffect, useState } from "react";
import axios from "axios";

export default function useFeatures() {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fechData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8800/api/hotels/countByCity?cities=berlin,madrid,london"
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        if(axios.isAxiosError(err)){
            setError(err.message)
        }
      }
      setLoading(false);
    };
    fechData();
  }, []);
  return { data, loading, error };
}
