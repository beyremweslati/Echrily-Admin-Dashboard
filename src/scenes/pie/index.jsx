import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";

const Pie = () => {
    const { data: orders } = useFetchData("https://echrily.shop/api/orders");
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        const calculateRevenueShare = () => {
            if(orders.length !== 0){
                console.log(orders);
                const platformRevenue = {};
                var totalRevenue = 0;
                
                orders.forEach(order => {
                    order.items.forEach(item => {
                        const platform = item.platform;
                        const price = item.price;

                        if(!platformRevenue[platform]){
                            platformRevenue[platform] = 0;
                        }
                        platformRevenue[platform] += price;
                        totalRevenue += price;
                    })
                })
                const data = Object.entries(platformRevenue).map(([platform, revenue]) => ({
                    id: platform,
                    value: revenue,
                    percentage: ((revenue / totalRevenue) * 100).toFixed(2),
                }))
                setPieData(data);
                }

        }

        calculateRevenueShare();
    }, [orders])

    return ( 
        <Box m="20px">
            <Header title="Pie Chart" subtitle="Simple Pie Chart" />
            <Box height="75vh" display="flex" width="100%">
                {/* <PieChart data={pieData} /> */}
            </Box>
        </Box>
    );
}

export default Pie;