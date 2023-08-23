const { TE } = require("Helper");

const validateKey = (req) => {
  const { contractId } = req.body;

  if (contractId) return;

  TE("invalid contract-id");
};

const _getMessage = (err) => {
  if (typeof err === "string") return err;

  if (err.message) return err.message;

  if (err.slack) return err.slack;

  if (typeof error === "object") {
    return JSON.stringify(err);
  }

  console.log(err);

  return "";
};

const _errorCode = (err) => ({
  "00": "create successfully executed",
  "01": "update successfully executed",
  90: "successfully deleted",
  98: "already exist",
  99: err ? _getMessage(err) : "changes requested failed",
});

const actionReturnCode = (code, success, msg, data) => ({
  code: code,
  success: success,
  data: data,
  message: _errorCode(msg)[code],
});

module.exports = {
  validateKey,

  actionReturnCode,
};
