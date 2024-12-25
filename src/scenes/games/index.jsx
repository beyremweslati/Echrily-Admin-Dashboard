import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";

const Games = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get("https://echrily.shop/api/games");
                setGames(response.data);
            } catch (err) {
                console.error("Failed to fetch games");
            }
        };

        fetchGames();
    }, []);

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "title",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "ISAD_ID",
            headerName: "IsThereAnyDeal ID",
            flex: 1,
        },
        {
            field: "banner",
            headerName: "Banner",
            flex: 1,
            renderCell: ({ row: { banner } }) => {
                return (
                    <Box
                        display="flex"
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                        overflow="hidden"
                    >
                        <img
                            src={`https://echrily.shop/${banner}`}
                            alt="banner"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: "shop",
            headerName: "Platform",
            renderCell: ({ row: { shop } }) => {
                return (
                    <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img
                            src={`../../../assets/${shop.split(" ").join("")}.svg`}
                            alt="Platform"
                            height="34px"
                            width="34px"
                            style={{
                                filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                            }}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="GAMES" subtitle="Managing Games" />
            <Box
                m="40px 0 0 0 "
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.blueAccent[500],
                        fontSize: "14px",
                        fontWeight: "bold",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.primary[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? colors.primary[700]
                                : colors.grey[900],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={games}
                    columns={columns}
                    rowHeight={130}
                    slots={{ toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Games;
