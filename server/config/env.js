const dotenv = require("dotenv");

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ECHRILY_API_KEY: process.env.ECHRILY_API_KEY,
  RAWG_API_KEY: process.env.RAWG_API_KEY,
  ITA_API_KEY: process.env.ITA_API_KEY,
};

module.exports = env;
