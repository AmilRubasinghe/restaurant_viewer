const dotenv = require("dotenv");
dotenv.config();

const ACCESS = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};

const APPLICATION = {
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const MAIL_SERVER = {
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
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

  ACCESS,

  MAIL_SERVER,
};
