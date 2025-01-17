import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Header from "../../components/Header";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import Chip from "@mui/material/Chip";
import React from "react";
import axios from "axios";
const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: orders, fetchData: refetchOrders } = useFetchData(
    "https://echrily.shop/api/orders"
  );
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Confirmation Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // Success/Error message
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const updateStatusForSelected = async (status) => {
    setSelectedOrders([]);

    const updatePromises = selectedOrders.map(async (orderId) => {
      try {
        const response = await axios.post(
          `https://echrily.shop/api/orders/${orderId}`,
          {
            status: status,
          }
        );
        if (response) {
          console.log(`Order ${orderId} updated successfully`);
        }
      } catch (error) {
        console.error(`Failed to update order ${orderId}:`, error);
        return "error";
      }
      return "success";
    });

    // Wait for all promises to resolve
    const res = await Promise.all(updatePromises);
    if (res.includes("error")) {
      setSeverity("error");
      setMessage("Some orders failed to update");
    } else {
      setSeverity("success");
      setMessage("All orders updated successfully");
    }
    setOpenSnackbar(true);
    refetchOrders();
  };

  const handleConfirm = (status) => {
    setNewStatus(status);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogConfirm = () => {
    updateStatusForSelected(newStatus);
    handleDialogClose();
  };

  const StyledChip = styled(Chip)(({ theme }) => ({
    justifyContent: "left",
    "& .icon": {
      color: "inherit",
    },
    "&.Completed": {
      color: (theme.vars || theme).palette.success.dark,
      border: `1px solid ${(theme.vars || theme).palette.success.main}`,
    },
    "&.Cancelled": {
      color: (theme.vars || theme).palette.error.dark,
      border: `1px solid ${(theme.vars || theme).palette.error.main}`,
    },
    "&.Pending": {
      color: (theme.vars || theme).palette.info.dark,
      border: `1px solid ${(theme.vars || theme).palette.info.main}`,
    },
  }));

  const Status = React.memo((props) => {
    const { status } = props;

    let icon = null;
    if (status === "Cancelled") {
      icon = <ReportProblemIcon className="icon" />;
    } else if (status === "Completed") {
      icon = <DoneIcon className="icon" />;
    } else {
      icon = <InfoIcon className="icon" />;
    }
    let label = status;
    return (
      <StyledChip
        className={status}
        icon={icon}
        size="small"
        label={label}
        variant="outlined"
      />
    );
  });
  const columns = useMemo(
    () => [
      { field: "orderId", headerName: "Order ID" },
      {
        field: "name",
        headerName: "Name",
        cellClassName: "highlighted-column--cell",
        flex: 0.5,
      },
      {
        field: "email",
        flex: 0.5,
        headerName: "E-Mail",
      },
      {
        field: "phone",
        flex: 0.5,
        headerName: "Phone Number",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        flex: 0.5,
        field: "status",
        headerName: "Status",
        renderCell: ({ row: { status } }) => {
          return (
            <Box>
              <Status status={status} />
            </Box>
          );
        },
      },
      {
        flex: 1,
        field: "items",
        headerName: "Items",
        height: "100%",
        renderCell: ({ row: { items } }) => {
          return (
            <Box
              display="flex"
              overflow="scroll"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              {items.map((item, index) => {
                return (
                  <Box key={index}>
                    <Typography variant="h6">
                      {item.name} | Qte: {item.quantity}
                      {item.currency} | Price: {item.price}TND
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          );
        },
      },
      {
        field: "totalAmount",
        headerName: "Total",
        type: "number",
        headerAlign: "left",
        align: "left",
        cellClassName: "highlighted-column--cell",
        renderCell: ({ row: { totalAmount } }) => {
          return <Box>{totalAmount}TND</Box>;
        },
      },
    ],
    []
  );

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Managing Orders" />
      <Box display="flex" flexDirection="column" gap="10px">
        <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .highlighted-column--cell": {
              color: colors.blueAccent[500],
              fontSize: "14px",
              fontWeight: "bold",
              flexShrink: "1",
            },
            "& .non-selectable-row": {
              "& .MuiCheckbox-root": {
                color: ` ${colors.grey[500]} !important`,
              },
            },
            "& .selectable-row": {
              backgroundColor: "inherit",
              "& .MuiCheckbox-root": {
                color: `${colors.blueAccent[500]} !important`,
              },
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.primary[400],
              borderBottom: "none",
              "& .MuiCheckbox-root": {
                color: `${colors.blueAccent[500]} !important`,
              },
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
            checkboxSelection
            getRowId={(row) => row.orderId}
            onRowSelectionModelChange={(ids) => setSelectedOrders(ids)}
            isRowSelectable={(params) => params.row.status === "Pending"}
            rowSelectionModel={selectedOrders}
            getRowClassName={(params) =>
              params.row.status === "Pending"
                ? "selectable-row"
                : "non-selectable-row"
            }
            rows={orders}
            columns={columns}
            rowHeight={100}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap="20px">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => handleConfirm("Completed")}
            disabled={selectedOrders.length === 0}
          >
            Mark as Completed
          </Button>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => handleConfirm("Cancelled")}
            disabled={selectedOrders.length === 0}
          >
            Mark as Cancelled
          </Button>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to update the status of the selected orders to
            "{newStatus}"?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color={colors.primary[500]}>
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color={colors.primary[500]}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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

export default Orders;
