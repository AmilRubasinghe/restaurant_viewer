const Constants = require("./constants");

const DataBase = require("../user-management/database");

const Sequelize = require("sequelize");

const { ACCESS_TOKEN } = require("../../../config/config").ACCESS;

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { to, TE } = require("../../helper");

const login = async (data) => {
  let loginData = data;

  console.log("loginData", loginData);

  const getRecode = DataBase.findByQuery({
    where: { userName: data.userName },
  });

  const [error, resultData] = await to(getRecode);

  console.log("resultData", resultData.user);

  if (error) TE(error);

  if (resultData && resultData.length > 0) {
    if (
      resultData.active == true &&
      bcrypt.compareSync(loginData.password, resultData.password)
    ) {
      const response = {
        email: resultData.email,
        role: resultData.role,
        name: resultData.name,
        id: resultData.id,
      };
      const accessToken = jwt.sign(response, ACCESS_TOKEN, { expiresIn: "8h" });

      return { token: accessToken };
    } else {
      TE("Incorrect Password");
      return;
    }
  } else {
    TE("Incorrect username or email");
    return;
  }
};

module.exports = {
  login,
};
