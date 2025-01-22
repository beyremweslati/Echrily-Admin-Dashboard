import {
  Box,
  useTheme,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useMemo, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const AddGames = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedGamesObjects, setSelectedGamesObjects] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const rawgKey = process.env.REACT_APP_RAWG_API_KEY;
  const ITADKey = process.env.REACT_APP_ITA_API_KEY;
  const fetchGames = async () => {
    try {
      const response = await axios.get("/api/admin/rawgGames", {
        params: {
          searchTerm: searchTerm,
        },
      });
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchTerm === "") {
        setGames([]);
      } else {
        fetchGames();
      }
    }
  };
  const handleSelection = (ids) => {
    setSelectedGames(ids);
    setSelectedGamesObjects(
      ids.map((id) => games.find((game) => game.id === id))
    );
  };
  const handleAddGames = async () => {
    setIsLoading(true);
    try {
      const finalGames = await Promise.all(
        selectedGamesObjects.map(async (game) => {
          try {
            const isadResponse = await axios.get("/api/admin/isad-lookup", {
              params: {
                gameName: game.name,
              },
            });
            const isadID = isadResponse.data.found
              ? isadResponse.data.game.id
              : null;
            return {
              rawgID: game.slug,
              ISAD_ID: isadID,
              title: game.name,
              id: game.id,
              price: 0,
              banner: game.background_image,
              shop: "",
            };
          } catch (error) {
            console.error(`Failed to fetch ISAD id for game : ${game.name}`);
            return null;
          }
        })
      );
      const res = await axios.post("/api/admin/add-games", {
        games: finalGames,
      });
      if (res.status === 201) {
        setMessage("Game(s) added successfully");
        setSeverity("success");
      } else if (res.status === 200) {
        setMessage("Game(s) already exists");
        setSeverity("warning");
      }
      setSelectedGames([]);
      setSelectedGamesObjects([]);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error Adding games", error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID" },
      { field: "name", headerName: "Name", flex: 1 },
      {
        field: "platforms",
        headerName: "Platforms",
        flex: 1,
        renderCell: ({ row: { platforms } }) => {
          return platforms.map((platform) => platform.platform.name).join(", ");
        },
      },
      { field: "rating", headerName: "Rating" },
      { field: "released", headerName: "Release Date" },
      {
        field: "stores",
        headerName: "Stores",
        flex: 1,
        renderCell: ({ row: { stores } }) => {
          return stores
            ? stores.map((store) => store.store.name).join(", ")
            : "";
        },
      },
      {
        field: "background_image",
        headerName: "Banner",
        flex: 1,
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
          display="flex"
          width="20%"
          minWidth="160px"
          maxWidth="400px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search for Games"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box
          m="0px 0 0 0 "
          height="75vh"
          sx={{
            overflowX: "auto",
            "& .MuiDataGrid-root": {
              border: "none",
              minWidth: "1000px",
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
            onRowSelectionModelChange={(ids) => handleSelection(ids)}
            rowSelectionModel={selectedGames}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap="20px" mt="10px">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => handleAddGames()}
            disabled={selectedGames.length === 0 || isLoading}
            startIcon={
              isLoading ? <CircularProgress size={24} color="inherit" /> : null
            }
          >
            Add to website
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddGames;
