import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const AddUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  return (
    <Box m="20px">
      <Header title="ADD USERS" subtitle="Adding Users" />
      <Box
        component="form"
        // onSubmit={handleSubmit}
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

        {/* Role Select */}
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
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
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
    </Box>
  );
};

export default AddUsers;
