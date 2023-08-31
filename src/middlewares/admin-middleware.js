const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../helper");
const { ACCESS_TOKEN } = require("../../config/config").ACCESS;


exports.checkAdminToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Token Expired' })
                }
                return UNAUTHORIZED_ERROR(res, { error: 'Access Token Invalid' })
            } else {
                if (decoded.role === 'admin') {
                    req.user = decoded;
                    next();
                } else {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Denied' })
                }

            }
        });
    } else {
        return UNAUTHORIZED_ERROR(res, { error: 'Access Token Not Provided' })
    }
};

exports.checkUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Token Expired' })
                }
                return UNAUTHORIZED_ERROR(res, { error: 'Access Token Invalid' })
            } else {
                if (decoded.role === 'user') {
                    req.user = decoded;
                    next();
                } else {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Denied' })
                }

            }
        });
    } else {
        return UNAUTHORIZED_ERROR(res, { error: 'Access Token Not Provided' })
    }
};

exports.checkAdminAndUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Token Expired' })
                }
                return UNAUTHORIZED_ERROR(res, { error: 'Access Token Invalid' })
            } else {
                if (decoded.role === 'user' || decoded.role === 'admin') {
                    req.user = decoded;
                    next();
                } else {
                    return UNAUTHORIZED_ERROR(res, { error: 'Access Denied' })
                }

            }
        });
    } else {
        return UNAUTHORIZED_ERROR(res, { error: 'Access Token Not Provided' })
    }
};
