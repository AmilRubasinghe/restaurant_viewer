const _setCode = (code, httpCode) => ({
  code: code, // custom_code
  hc: httpCode, // http_code
});

const Codes = {
  SUC_CODES: { ..._setCode(1, 200), message: "ok" },
  SUC_REGISTERED: { ..._setCode(1, 200), message: "Successfully Registered" },
  ERR_USERNAME_EXIST: {
    ..._setCode(1, 400),
    message: "User name is already exist",
  },

  ERR_INCORRECT_USERNAME: {
    ..._setCode(1, 401),
    message: "Incorrect Username or Password",
  },
  ERR_SOMETHING_WRONG: {
    ..._setCode(1, 400),
    message: "Something went wrong. Please try again later",
  },
};

const roles = ["user", "admin", "phi"];

module.exports = { Codes, roles };
