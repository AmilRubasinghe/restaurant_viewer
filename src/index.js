const express = require("express");

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");

const { accessHeader } = require("./init");

const { generateTables } = require("./scripts/middleware");

app.use(cors());

const cookieParser = require("cookie-parser");

const router = require("./router");

const { Config } = require("../config");

const { DEFINITION, APIS } = Config.SWAGGER;

const { JSON_PARSER, URLENCODED } = Config.BODYPARSER;

app.use(bodyParser.json(JSON_PARSER));

app.use(bodyParser.urlencoded(URLENCODED));

app.use(cookieParser());

app.use(accessHeader);

app.use("/", router);

generateTables();

const options = {
  swaggerDefinition: DEFINITION("V1"),
  apis: [
    ...APIS["V1"].map((api) => `./src/modules/${api}/swagger/*.yaml`),
    "./src/swagger/*.yaml",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
