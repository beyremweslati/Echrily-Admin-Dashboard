import { Box, useTheme, IconButton } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const AddGames = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("red dead redemption");

  const fetchGames = async () => {
    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          search: searchTerm,
          key: "143ba22c4abd40a39b65306fdb7a36ba",
          ordering: "-metacritic",
          page: 1,
          page_size: 3,
        },
      });
      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [searchTerm]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 200 },
      {
        field: "platforms",
        headerName: "Platforms",
        width: 300,
        renderCell: ({ row: { platforms } }) => {
          return platforms.map((platform) => platform.platform.name).join(", ");
        },
      },
      { field: "rating", headerName: "Rating", width: 120 },
      { field: "released", headerName: "Release Date", width: 180 },
      {
        field: "stores",
        headerName: "Stores",
        width: 300,
        renderCell: ({ row: { stores } }) => {
          return stores.map((store) => store.store.name).join(", ");
        },
      },
      { field: "metacritic", headerName: "Metacritic Score", width: 160 },
      { field: "added", headerName: "Added Count", width: 160 },
      {
        field: "background_image",
        headerName: "Image",
        width: 300,
        renderCell: ({ row: { background_image } }) => {
          return (
            <Box
              display="flex"
              height="100%"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
            >
              <img
                src={background_image}
                alt="banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <Box m="20px">
      <Header title="GAMES" subtitle="Adding Games" />
      <Box display="flex" flexDirection="column">
        <Box
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          maxWidth="15%"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search for Games" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
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
              flexShrink: "1",
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
            "& .MuiCheckbox-root": {
              color: `${colors.blueAccent[500]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={games}
            columns={columns}
            rowHeight={130}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddGames;
