import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import useFetchData from "../../hooks/useFetchData";
const Bar = () => {
  const { data } = useFetchData("api/admin/sales");

  return (
    <Box m="20px">
      <Header title="CHARTS" subtitle="Bar Chart" />
      <Box
        height="75vh"
        display="flex"
        width="100%"
        flexDirection={{
          xs: "column",
          md: "row",
        }}
      >
        <Box width={{ md: "50%", xs: "100%" }} height="100%">
          <BarChart
            data={data}
            keyName="quantity"
            legendY="Sold"
            legendX="Game"
          />
        </Box>
        <Box width={{ md: "50%", xs: "100%" }} height="100%">
          <BarChart
            data={data}
            keyName="totalAmount"
            currency="TND"
            legendY="Total"
            legendX="Game"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Bar;
