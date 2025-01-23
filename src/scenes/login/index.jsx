import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post("/api/auth/login", { email, password });
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //       navigate("/dashboard");
  //     } catch (error) {
  //       setError("Invalid email or password");
  //     }
  //   };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: colors.primary[500] }}
    >
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: "40px",
          borderRadius: "10px",
          boxShadow: `0px 0px 30px ${colors.grey[900]}`,
          width: "400px",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color={colors.grey[100]}
          textAlign="center"
          mb="20px"
        >
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <Box mb="20px">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.grey[100],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.blueAccent[500],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[100],
                },
                "& .MuiInputBase-input": {
                  color: colors.grey[100],
                },
              }}
            />
          </Box>

          <Box mb="20px">
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.grey[100],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.blueAccent[500],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[100],
                },
                "& .MuiInputBase-input": {
                  color: colors.grey[100],
                },
              }}
            />
          </Box>

          {error && (
            <Typography color="error" textAlign="center" mb="10px">
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px",
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
