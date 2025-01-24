const axios = require("axios");

const getOrders = async (req, res) => {
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
};

const getSales = async (req, res) => {
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
};

const getGames = async (req, res) => {
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
    console.error("Error fetching games:", error.message);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

const getDailySales = async (req, res) => {
  try {
    const response = await axios.get("https://echrily.shop/api/sales/daily", {
      headers: {
        "x-api-key": process.env.ECHRILY_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching daily sales:", error.message);
    res.status(500).json({ error: "Failed to fetch daily sales" });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const response = await axios.get(
      "https://echrily.shop/api/stats/monthly-revenue",
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching monthly revenue:", error.message);
    res.status(500).json({ error: "Failed to fetch monthly revenue" });
  }
};

const toggleGameVisibility = async (req, res) => {
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
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error toggling game visibility:", error.message);
    res.status(500).json({ error: "Failed to toggle game visibility" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await axios.post(
      `https://echrily.shop/api/orders/${id}`,
      { status },
      {
        headers: {
          "x-api-key": process.env.ECHRILY_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

const getRawgGames = async (req, res) => {
  try {
    const { searchTerm } = req.query;
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
    console.error("Error fetching RAWG games:", error.message);
    res.status(500).json({ error: "Failed to fetch RAWG games" });
  }
};

const getIsadLookup = async (req, res) => {
  try {
    const { gameName } = req.query;
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
    console.error("Error fetching ISAD data:", error.message);
    res.status(500).json({ error: "Failed to fetch ISAD data" });
  }
};

const addGames = async (req, res) => {
  try {
    const { games } = req.body;
    const response = await axios.post(
      "https://echrily.shop/api/games/add",
      { games },
      {
        headers: {
          "X-API-KEY": process.env.ECHRILY_API_KEY,
        },
      }
    );
    if (response.status === 201) {
      res.status(201).json(response.data);
    } else {
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.error("Error adding games:", error.message);
    res.status(500).json({ error: "Failed to add games" });
  }
};

module.exports = {
  getOrders,
  getSales,
  getGames,
  getDailySales,
  getMonthlyRevenue,
  toggleGameVisibility,
  updateOrderStatus,
  getRawgGames,
  getIsadLookup,
  addGames,
};
