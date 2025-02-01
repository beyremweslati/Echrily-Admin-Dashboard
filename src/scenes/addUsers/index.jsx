import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const AddUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/admin/add-user",
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("Admin");

        setSeverity("success");
        setMessage("User added successfully!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSeverity("error");
      setMessage(error.response?.data?.error || "Could not add user");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD USERS" subtitle="Adding Users" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap="20px"
        mt="20px"
        p="20px"
        backgroundColor={colors.primary[400]}
        borderRadius="4px"
      >
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Add New Admin
        </Typography>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiInputBase-input": { color: colors.grey[100] },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiInputBase-input": { color: colors.grey[100] },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiInputBase-input": { color: colors.grey[100] },
          }}
        />

        <TextField
          fullWidth
          select
          label="Role"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiInputBase-input": { color: colors.grey[100] },
          }}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Editor">Editor</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={24} color="inherit" /> : null
          }
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          Add Admin
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

export default AddUsers;
