import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Games from "./scenes/games";
import Orders from "./scenes/orders";
function App() {
  const [theme, colorMode] = useMode();
  const sampleOrders = [
    {
      orderId: "1735212442421",
      email: "beyrem.weslati@gmail.com",
      name: "Beyrem Weslati",
      phone: "56612215",
      totalAmount: 320,
      status: "Completed",
      items: [
        {
          _id: "676d3d9a155f0c38880ce7ee",
          name: "Helldivers II",
          price: 160,
          quantity: 2,
          shop: "Steam"
        },
        {
          _id: "676d3d9a155f0c38880ce7ef",
          name: "else 2077",
          price: 200,
          quantity: 2,
          shop: "Epic Games"
        }
      ]
    },
    {
      orderId: "1735212442422",
      email: "john.doe@gmail.com",
      name: "John Doe",
      phone: "56612216",
      totalAmount: 400,
      status: "Cancelled",
      items: [
        {
          _id: "676d3d9a155f0c38880ce7ef",
          name: "Cyberpunk 2077",
          price: 200,
          quantity: 2,
          shop: "Epic Games"
        }
      ]
    },
    {
      orderId: "154561321",
      email: "john.doe@gmail.com",
      name: "John Doe",
      phone: "56612216",
      totalAmount: 400,
      status: "Pending",
      items: [
        {
          _id: "676d3d9a155f0c38880ce7ef",
          name: "Cyberpunk 2077",
          price: 200,
          quantity: 2,
          shop: "Epic Games"
        }
      ]
    },
  ];
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
            <Route path="/orders" element={<Orders orders={sampleOrders}/>} />
          </Routes>
        </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
