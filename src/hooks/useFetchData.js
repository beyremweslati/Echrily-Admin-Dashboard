import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, fetchData };
};

export default useFetchData;
