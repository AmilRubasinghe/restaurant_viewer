const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../helper");
const { ACCESS_TOKEN } = require("../../config/config").ACCESS;

const _checkToken = (req, res, next, roleList) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return UNAUTHORIZED_ERROR(res, { error: "Access Token Expired" });
        }
        return UNAUTHORIZED_ERROR(res, { error: "Access Token Invalid" });
      } else {
        if (roleList.includes(decoded.role)) {
          req.user = decoded;
          next();
        } else {
          return UNAUTHORIZED_ERROR(res, { error: "Access Denied" });
        }
      }
    });
  } else {
    return UNAUTHORIZED_ERROR(res, { error: "Access Token Not Provided" });
  }
};

exports.checkAdminToken = (req, res, next) => {
  _checkToken(req, res, next, ["admin"]);
};

exports.checkUserToken = (req, res, next) => {
  _checkToken(req, res, next, ["user"]);
};

exports.checkPhiToken = (req, res, next) => {
  _checkToken(req, res, next, ["phi"]);
};

exports.checkAdminAndUserToken = (req, res, next) => {
  _checkToken(req, res, next, ["user", "admin"]);
};

exports.checkAdminAndPhiToken = (req, res, next) => {
  _checkToken(req, res, next, ["admin", "phi"]);
};

exports.checkAdminPhiAndUserToken = (req, res, next) => {
  _checkToken(req, res, next, ["user", "admin", "phi"]);
  
};
