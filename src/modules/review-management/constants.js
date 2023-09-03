const _setCode = (code, httpCode) => ({
  code: code, // custom_code
  hc: httpCode, // http_code
});

const Codes = {
  SUC_CODES: { ..._setCode(1, 200), message: "ok" },
};

const status = ["good", "bad"];

module.exports = { Codes, status };
