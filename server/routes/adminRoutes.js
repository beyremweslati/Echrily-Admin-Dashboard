const express = require("express");
const adminController = require("../controllers/adminController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/orders", authenticate, adminController.getOrders);
router.get("/sales", authenticate, adminController.getSales);
router.get("/games", authenticate, adminController.getGames);
router.get("/sales/daily", authenticate, adminController.getDailySales);
router.get(
  "/stats/monthly-revenue",
  authenticate,
  adminController.getMonthlyRevenue
);
router.get("/rawgGames", authenticate, adminController.getRawgGames);
router.get("/isad-lookup", authenticate, adminController.getIsadLookup);
router.patch(
  "/games/:gameId/toggle-visibility",
  authenticate,
  adminController.toggleGameVisibility
);
router.post("/orders/:id", authenticate, adminController.updateOrderStatus);
router.post("/add-games", authenticate, adminController.addGames);

module.exports = router;
