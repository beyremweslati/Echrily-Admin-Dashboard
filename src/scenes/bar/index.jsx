import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useState, useEffect } from "react";
import axios from "axios";
const Bar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get("https://echrily.shop/api/sales");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart" />
            <Box height="75vh" display="flex" width="100%">
                <Box width="50%" height="100%">
                    <BarChart data={data} keyName="quantity"  legendY="Sold" legendX="Game" />
                </Box>
                <Box width="50%" height="100%">
                    <BarChart data={data} keyName="totalAmount" currency="TND" legendY="Total" legendX="Game" />
                </Box>
            </Box>
        </Box>
    );
};

export default Bar;