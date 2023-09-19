const { ERROR } = require("./helper");

const { Config } = require("../config");

const { ALLOW_HEADERS, ALLOWED_DOMAINS, ALLOW_METHODS } = Config.ACCESS_HEADERS;

const accessHeader = (req, res, next) => {
  if (ALLOWED_DOMAINS.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);

    res.header("Access-Control-Allow-Headers", ALLOW_HEADERS);
  }

  next();
};


const _404 = (req, res) => {
  res.status(404).json({
    code: 404,
    message: "NOT_FOUND",
    success: false,
    error: {
      errmsg: "Route" + req.url + " Not found.",
      code: 404,
    },
  });
};

const _500 = (err, req, res) => {
  res.status(500).send({
    code: 500,
    error: err,
  });
};

module.exports = {
  accessHeader,

  _404,

  _500,
};
