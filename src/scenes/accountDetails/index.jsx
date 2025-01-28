import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  useTheme,
  Avatar,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { tokens } from "../../theme";
import axios from "axios";

const AccountDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [lengthError, setLengthError] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setSeverity("error");
      setMessage("Passwords do not match");
      setOpenSnackbar(true);

      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (newPassword.length < 8) {
      setSeverity("error");
      setMessage("Password must be 8 characters long");
      setOpenSnackbar(true);

      setLengthError(true);
      return;
    } else {
      setLengthError(false);
    }
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSeverity("success");
        setMessage("Password Changed successfully");
        setOpenSnackbar(true);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError(false);
        setLengthError(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to change Password");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };
  return (
    <Box m="20px">
      <Header
        title="ACCOUNT DETAILS"
        subtitle="Manage your account information"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        mb="40px"
      >
        {user.img && (
          <Avatar
            alt={user.name}
            src={user.img}
            sx={{
              width: 140,
              height: 140,
              backgroundColor: colors.blueAccent[500],
            }}
          />
        )}
        {!user.img && (
          <Avatar
            alt={user.name}
            sx={{
              width: 140,
              fontSize: 64,
              height: 140,
              backgroundColor: colors.blueAccent[500],
            }}
          >
            {Array.from(user.name)[0]}
          </Avatar>
        )}
        <Typography variant="h1" fontWeight="bold" color={colors.grey[100]}>
          {user.name}
        </Typography>
        <Typography variant="h4" color={colors.blueAccent[500]}>
          {user.email}
        </Typography>
      </Box>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap="20px"
        mx="auto"
        p="20px"
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
      >
        <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
          Change Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          sx={{
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
              "&.Mui-focused fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setLengthError(e.target.value.length < 8);
          }}
          required
          sx={{
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
              "&.Mui-focused fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
          error={newPassword !== "" && lengthError}
          helperText={
            newPassword && lengthError
              ? "Password must be at least 8 characters long"
              : ""
          }
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError(e.target.value !== newPassword);
          }}
          required
          sx={{
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
              "&.Mui-focused fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
          error={confirmPassword !== "" && passwordError}
          helperText={
            confirmPassword && passwordError ? "Password does not match" : ""
          }
        />
        <Button
          fullWidth
          onClick={handleChangePassword}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          Change Password
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
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountDetails;
