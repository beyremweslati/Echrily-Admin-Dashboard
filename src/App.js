import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Games from "./scenes/games";
import Orders from "./scenes/orders";
import AddGames from "./scenes/addGames";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Login from "./scenes/login";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isLoginPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && (
            <Box
              display="flex"
              width={isCollapsed ? "80px" : "270px"}
              flexShrink="0"
              sx={{ transition: "width 0.3s" }}
            >
              <Sidebar
                toggleSidebar={toggleSidebar}
                isCollapsed={isCollapsed}
              />
            </Box>
          )}

          <main className="content">
            {!isLoginPage && <Topbar />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-games" element={<Games />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/add-games" element={<AddGames />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
