import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import OverviewBox from "../../components/OverviewBox";
import ProgressCirlce from "../../components/ProgressCircle";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data: monthlyRevenue } = useFetchData("https://echrily.shop/api/stats/monthly-revenue");
    const { data: Orders } = useFetchData("https://echrily.shop/api/orders");

    const completedOrders = Orders.filter(order => order.status === "Completed");

    const totalGamesOrdered = Orders.reduce((sum,order) => sum + order.items.length,0)
    const gamesSold = completedOrders.reduce((sum,order) => sum + order.items.length,0)
    const percentageSold = (totalGamesOrdered === 0 ? 0 : (gamesSold / totalGamesOrdered) * 100).toFixed(1);
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
                        detail= "Since last month"
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
                        detail = {Orders.filter(order => order.status === "Pending").length + " Pending"}
                        icon={
                            <ReceiptOutlinedIcon
                                sx={{ color: colors.blueAccent[500], fontSize: "32px" }}
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
                        progress={percentageSold/100}
                        increase={percentageSold}
                        detail="Of ordered Games"
                        icon={
                            <ShoppingCartOutlinedIcon
                                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default Dashboard;
