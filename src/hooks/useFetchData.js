import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchData = (url, config = {}) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, fetchData };
};

export default useFetchData;
