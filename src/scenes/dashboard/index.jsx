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
import ProgressCirlce from "../../components/ProgressCircle";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mockTransactions } from "../../data/mockData";
import useOrderMetrics from "../../hooks/useOrderMetrics";
const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { data: Orders } = useFetchData("https://echrily.shop/api/orders");
    const { lineData } = useLineChartData("https://echrily.shop/api/sales/daily"); 
    const { data: monthlyRevenue } = useFetchData("https://echrily.shop/api/stats/monthly-revenue");
    
    const {
        completedOrders,
        totalRevenue,
        gamesSold,
        percentageSold,
    } = useOrderMetrics(Orders || []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
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

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="12,361"
                        subtitle="Emails sent"
                        progress="0.75"
                        increase="75.0"
                        detail="Since last month"
                        icon={
                            <DownloadOutlinedIcon
                                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
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
                    gridColumn="span 3"
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
                    gridColumn="span 3"
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
                    gridColumn="span 4"
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
                            key={`${order.orderId}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[400]}`}
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
                                <Typography color={colors.grey[100]}>
                                    {order.name}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}> {new Date(order.createdAt).toLocaleDateString("fr-FR")}</Box>
                            <Box
                                backgroundColor={colors.blueAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {order.totalAmount}TND
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
