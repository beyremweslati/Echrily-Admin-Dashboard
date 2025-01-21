import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import useFetchData from "../../hooks/useFetchData";
import Header from "../../components/Header";
import { useMemo, useState } from "react";
import axios from "axios";
const Games = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: games, fetchData: refetchGames } = useFetchData(
    "https://echrily.shop/api/games?showHidden=true"
  );
  const [selectedGames, setSelectedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Success/Error message
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const handleToggle = async () => {
    setIsLoading(true);
    const updatePromises = selectedGames.map(async (game) => {
      try {
        const res = await axios.patch(
          `/api/admin/games/${game}/toggle-visibility`
        );
      } catch (error) {
        console.error(`Failed to update game ${game}:`, error.message);
        return "error";
      }
      return "success";
    });
    const res = await Promise.all(updatePromises);
    if (res.includes("error")) {
      setSeverity("error");
      setMessage("Some Game(s) failed to update");
    } else {
      setSeverity("success");
      setMessage("Game(s) updated successfully");
    }
    setIsLoading(false);
    setOpenSnackbar(true);
    setSelectedGames([]);
    refetchGames();
  };
  const columns = useMemo(
    () => [
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
        renderCell: ({ row: { price } }) => {
          return price + "TND";
        },
      },
      {
        field: "isVisible",
        renderCell: ({ row: { status } }) => {
          return <Box></Box>;
        },
        headerName: "Status",
        renderCell: ({ row: { isVisible } }) => {
          return isVisible ? "Visible" : "Hidden";
        },
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
                  objectFit: "cover",
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
    ],
    [theme.palette.mode]
  );

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
          rowSelectionModel={selectedGames}
          onRowSelectionModelChange={(ids) => setSelectedGames(ids)}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap="20px" mt="10px">
        <Button
          variant="contained"
          color="success"
          size="large"
          disabled={selectedGames.length === 0 || isLoading}
          onClick={() => handleToggle()}
          startIcon={
            isLoading ? <CircularProgress size={24} color="inherit" /> : null
          }
        >
          Toggle Visibility
        </Button>
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

export default Games;
