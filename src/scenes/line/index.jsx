import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";

const Line = () => {
    const { data: dailyOrders } = useFetchData("https://echrily.shop/api/sales/daily");

    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        if (dailyOrders.length !== 0) {
            const data = dailyOrders.map(order => ({
                x: order._id,          
                totalGames: order.totalGamesSold, 
                totalOrders: order.totalOrders
            }));

            const formattedData = [
                {
                    id: "Total Sales",        
                    data: data.map(d => ({
                        x: d.x,    
                        y: d.totalGames
                    }))            
                },
                {
                    id: "Total Orders", 
                    data: data.map(d => ({
                        x: d.x,
                        y: d.totalOrders
                    }))
                }

            ];

            setLineData(formattedData); 
        }
    }, [dailyOrders]);
    return ( 
        <Box m="20px">
            <Header title="Line Chart" subtitle="Simple Line Chart" />
            <Box height="75vh" display="flex" width="100%">
                <LineChart data={lineData}/>
            </Box>
        </Box>
    );  
}
export default Line;