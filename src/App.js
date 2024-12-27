import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Games from "./scenes/games";
import Orders from "./scenes/orders";
import Bar from "./scenes/bar";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-games" element={<Games />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/bar" element={<Bar />} />
          </Routes>
        </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
