const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");

const getRestaurantsData = async (params) => {
  const filter = { active: true };

  Object.assign(filter, params);

  const getRecodes = DataBase.findByQuery({
    where: filter,
    order: [["createdAt", "DESC"]],
  });

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getRestaurant = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const createRestaurantData = async (data) => {
  const getRecode = DataBase.findByQuery({
    where: { registrationNo: data.registrationNo },
  });

  const [error, resultData] = await to(getRecode);

  if ((resultData && resultData.length <= 0) || resultData == null) {
    const createSingleRecode = DataBase.createSingleRecode(data);

    const [err, result] = await to(createSingleRecode);

    if (err) TE(err);

    if (!result) TE("Result not found");

    return result;
  } else {
    TE("Registration number is already exist ");
  }

  if (error) TE(error);
};

const updateRestaurantData = async (filter, updateData) => {
  if (updateData.registrationNo) {
    const getRecode = DataBase.findOneByQuery({
      where: { registrationNo: updateData.registrationNo },
    });

    const [error, resultData] = await to(getRecode);

    if (resultData && resultData.registrationNo == updateData.registrationNo) {
      TE("Registration number is already exist ");
      return;
    }

    if (error) TE(error);
  }

  const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

  const [err, result] = await to(updateRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const phiData = await DataBase.findOneByQuery({ where: filter });

  return phiData;
};

const deleteRestaurantData = async (data) => {
  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getRestaurantsData,

  getRestaurant,

  createRestaurantData,

  updateRestaurantData,

  deleteRestaurantData,
};
