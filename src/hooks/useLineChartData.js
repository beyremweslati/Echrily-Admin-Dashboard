import { useState, useEffect } from "react";
import useFetchData from "./useFetchData";

const useLineChartData = (url) => {
    const { data: dailyOrders } = useFetchData(url); 
    const [lineData, setLineData] = useState([]);
        


    useEffect(() => {
        if (dailyOrders.length !== 0) {
            const data = dailyOrders.map((order) => ({
                x: order._id,
                totalGames: order.totalGamesSold,
                totalOrders: order.totalOrders,
            }));

            const formattedData = [
                {
                    id: "Total Sales",
                    data: data.map((d) => ({
                        x: d.x,
                        y: d.totalGames,
                    })),
                },
                {
                    id: "Total Orders",
                    data: data.map((d) => ({
                        x: d.x,
                        y: d.totalOrders,
                    })),
                },
            ];

            setLineData(formattedData);
        }
    }, [dailyOrders]);
    return {lineData};
}

export default useLineChartData;