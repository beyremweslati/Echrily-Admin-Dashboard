import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import useFetchData from "../../hooks/useFetchData";
const Bar = () => {
    const { data } = useFetchData("https://echrily.shop/api/sales");

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