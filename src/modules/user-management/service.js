const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const { ACCESS_TOKEN } = require("../../../config/config").ACCESS;

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const { to, TE } = require("../../helper");

const getUsers = async () => {
  const filter = { active: true };

  const getRecodes = DataBase.findByQuery({
    where: filter,
    order: [["createdAt", "DESC"]],
  });

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getUser = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const createUser = async (data) => {
  let storeData = data;

  storeData.password = bcrypt.hashSync(data.password, salt);

  const getRecode = DataBase.findOneByQuery({
    where: {
      [Op.or]: [{ userName: storeData.userName }, { email: storeData.email }],
    },
  });

  const [error, resultData] = await to(getRecode);

  if ((resultData && resultData.length <= 0) || resultData == null) {
    const createSingleRecode = DataBase.createSingleRecode(storeData);

    const [err, result] = await to(createSingleRecode);

    if (err) TE(err);

    if (!result) TE("Result not found");

    return result;
  } else {
    TE("User name or email already exist");
  }

  if (error) TE(error);
};

const updateUser = async (filter, updateData) => {
  if (updateData.email) {
    const getRecode = DataBase.findOneByQuery({
      where: filter,
    });

    const [error, resultData] = await to(getRecode);

    if (resultData && resultData.email == updateData.email) {
      TE("Email already exist");
      return;
    }
    if (error) TE(error);
  }

  const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

  const [err, result] = await to(updateRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const userData = await DataBase.findByQuery({ where: filter });

  return userData[0];
};

const deleteUser = async (data) => {
  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getUsers,

  getUser,

  createUser,

  updateUser,

  deleteUser,
};
