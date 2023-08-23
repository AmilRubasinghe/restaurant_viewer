const dotenv = require("dotenv");
dotenv.config();

const APPLICATION = {
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const ACCESS_HEADERS = {
  ALLOWED_DOMAINS: ["http://127.0.0.1:8080", "http://localhost:8080"],

  ALLOW_METHODS: "GET,PUT,POST,DELETE,PATCH,OPTIONS",

  ALLOW_HEADERS:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
};

const BODYPARSER = {
  JSON_PARSER: {
    limit: "50mb",
  },

  URLENCODED: {
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  },
};

module.exports = {
  APPLICATION,

  BODYPARSER,

  ACCESS_HEADERS,
};
