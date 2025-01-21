import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import useLineChartData from "../../hooks/useLineChartData";

const Line = () => {
  const { lineData } = useLineChartData("/api/admin/sales/daily");
  return (
    <Box m="20px">
      <Header title="CHARTS" subtitle="Line Chart" />
      <Box height="75vh" display="flex" width="100%">
        <LineChart data={lineData} />
      </Box>
    </Box>
  );
};
export default Line;
