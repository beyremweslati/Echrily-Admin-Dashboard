import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";

const Pie = () => {
  const { data: orders } = useFetchData("/api/admin/orders");
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const calculateRevenueShare = () => {
      if (orders.length !== 0) {
        const platformRevenue = {};
        var totalRevenue = 0;

        orders.forEach((order) => {
          order.items.forEach((item) => {
            const platform = item.shop;
            const price = item.price;

            if (!platformRevenue[platform]) {
              platformRevenue[platform] = 0;
            }
            platformRevenue[platform] += price;
            totalRevenue += price;
          });
        });
        const data = Object.entries(platformRevenue).map(
          ([platform, revenue]) => ({
            id: platform,
            label: platform,
            value: revenue / totalRevenue,
          })
        );
        setPieData(data);
      }
    };

    calculateRevenueShare();
  }, [orders]);
  return (
    <Box m="20px">
      <Header title="CHARTS" subtitle="Pie Chart" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box height="70vh" display="flex" width="80%">
          <PieChart data={pieData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Pie;
