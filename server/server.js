const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const env = require("./config/env");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
