const express = require("express");

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

const { accessHeader } = require("./init");

const { generateTables } = require("./scripts/middleware");

app.use(cors());

const cookieParser = require("cookie-parser");

const router = require("./router");

const { Config, Database } = require("../config");

const { JSON_PARSER, URLENCODED } = Config.BODYPARSER;

app.use(bodyParser.json(JSON_PARSER));

app.use(bodyParser.urlencoded(URLENCODED));

app.use(cookieParser());

app.use(accessHeader);

app.use("/", router);

generateTables();

Database.connect();

module.exports = app;
