import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import useLineChartData from "../../hooks/useLineChartData";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import OverviewBox from "../../components/OverviewBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import useOrderMetrics from "../../hooks/useOrderMetrics";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: Orders } = useFetchData("https://echrily.shop/api/orders");
  const { lineData } = useLineChartData("https://echrily.shop/api/sales/daily");
  const { data: sales } = useFetchData("https://echrily.shop/api/sales");
  const { data: games } = useFetchData("https://echrily.shop/api/games");

  const { data: monthlyRevenue } = useFetchData(
    "https://echrily.shop/api/stats/monthly-revenue"
  );
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const calculateRevenueShare = () => {
      if (Orders.length !== 0) {
        const platformRevenue = {};
        var totalRevenue = 0;

        Orders.forEach((order) => {
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
  }, [Orders]);
  const { completedOrders, totalRevenue, gamesSold, percentageSold } =
    useOrderMetrics(Orders || []);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        mb={{
          xs: "20px",
          sm: "0",
        }}
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Row 1 */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(8, 1fr)",
          md: "repeat(12, 1fr)",
        }}
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 4",
            md: "span 3",
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={monthlyRevenue.currentRevenue + " TND"}
            subtitle="Monthly Revenue"
            progress={monthlyRevenue.percentageChange / 100}
            increase={monthlyRevenue.percentageChange}
            detail="Since last month"
            icon={
              <AttachMoneyOutlinedIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 4",
            md: "span 3",
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={gamesSold + " Games"}
            subtitle="Games Sold"
            progress={percentageSold / 100}
            increase={percentageSold}
            detail="Of ordered Games"
            icon={
              <ShoppingCartOutlinedIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 4",
            md: "span 3",
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <OverviewBox
            title={Orders.length + " orders"}
            subtitle="Total orders received"
            detail={
              Orders.filter((order) => order.status === "Pending").length +
              " Pending"
            }
            icon={
              <ReceiptOutlinedIcon
                sx={{ color: colors.blueAccent[500], fontSize: "28px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 4",
            md: "span 3",
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <OverviewBox
            title={games.length + " Games"}
            subtitle="Total Games Available"
            icon={
              <DownloadOutlinedIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Row 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {totalRevenue}TND
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" mt="-20px">
            <LineChart data={lineData} isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 8",
            md: "span 4",
          }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Completed Orders
            </Typography>
          </Box>
          {completedOrders.map((order, i) => (
            <Box
              key={`${order.orderId}-${i}`}
              display="flex"
              justifyContent="space-between"
              textAlign={{
                xs: "center",
                sm: "start",
              }}
              flexDirection={{
                xs: "column",
                sm: "row",
              }}
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {order.orderId}
                </Typography>
                <Typography color={colors.grey[100]}>{order.name}</Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {new Date(order.createdAt).toLocaleDateString("fr-FR")}
              </Box>
              <Box
                backgroundColor={colors.blueAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                mt={{
                  xs: "10px",
                  sm: "0",
                }}
              >
                {order.totalAmount}TND
              </Box>
            </Box>
          ))}
        </Box>
        {/* Row 3 */}
        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 8",
            md: "span 7",
          }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Total Sales
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
          >
            <BarChart
              isDashboard={true}
              data={sales}
              keyName="totalAmount"
              currency="TND"
              legendY="Total"
              legendX="Game"
            />
          </Box>
        </Box>
        <Box
          gridColumn={{
            xs: "span 8",
            sm: "span 8",
            md: "span 5",
          }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Total Sales
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
          >
            <PieChart isDashboard={true} data={pieData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
