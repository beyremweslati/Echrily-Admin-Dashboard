import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  useTheme,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { tokens } from "../../theme";
const AccountDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        maxWidth="70%"
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
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{
            "& .MuiInputLabel-root": { color: colors.grey[100] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.grey[100] },
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
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
    </Box>
  );
};

export default AccountDetails;
