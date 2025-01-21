const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/admin/orders", async (req, res) => {
  try {
    const response = await axios.get("https://echrily.shop/api/orders", {
      headers: {
        "x-api-key": process.env.ECHRILY_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.get("/api/admin/sales", async (req, res) => {
  try {
    const response = await axios.get("https://echrily.shop/api/sales", {
      headers: {
        "x-api-key": process.env.ECHRILY_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

app.get("/api/admin/games", async (req, res) => {
  try {
    const { showHidden } = req.query;
    const response = await axios.get(
      `https://echrily.shop/api/games?showhidden=${showHidden}`,
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

app.get("/api/admin/sales/daily", async (req, res) => {
  try {
    const response = await axios.get("https://echrily.shop/api/sales/daily", {
      headers: {
        "x-api-key": process.env.ECHRILY_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});
app.get("/api/admin/stats/monthly-revenue", async (req, res) => {
  try {
    const response = await axios.get(
      `https://echrily.shop/api/stats/monthly-revenue`,
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ error: "Failed to fetch monthly revenue" });
  }
});
app.patch("/api/admin/games/:gameId/toggle-visibility", async (req, res) => {
  try {
    const { gameId } = req.params;
    const response = await axios.patch(
      `https://echrily.shop/api/games/${gameId}/toggle-visibility`,
      {},
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error toggling visibility:", error);
    res.status(500).json({ error: "Failed to toggle visibility" });
  }
});

app.post("/api/admin/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const response = await axios.post(
      `https://echrily.shop/api/orders/${id}`,
      { status: status },
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );

    if (response.status === 200) {
      res.status(200).json({ message: `Order ${id} updated successfully` });
    } else {
      res
        .status(response.status)
        .json({ message: `Failed to update order ${id}` });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: `Failed to update order ${id}` });
  }
});

app.get("/api/admin/rawgGames", async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        search: searchTerm,
        key: process.env.RAWG_API_KEY,
        page: 1,
        page_size: 15,
      },
    });

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error fetching games from RAWG:", error);
    res.status(500).json({ error: "Error fetching games" });
  }
});

app.get("/api/admin/isad-lookup", async (req, res) => {
  const { gameName } = req.query;

  try {
    const response = await axios.get(
      "https://api.isthereanydeal.com/games/lookup/v1",
      {
        params: {
          key: process.env.ITA_API_KEY,
          title: gameName,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching ISAD data:", error);
    res.status(500).json({ error: "Error fetching ISAD data" });
  }
});

app.post("/api/admin/add-games", async (req, res) => {
  const { games } = req.body;

  try {
    const response = await axios.post(
      "https://echrily.shop/api/games/add",
      {
        games,
      },
      {
        headers: {
          "X-API-KEY": process.env.ECHRILY_API_KEY,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error adding games:", error);
    res.status(500).json({ error: "Error adding games" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
