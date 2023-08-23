const Constants = require("./constants");

const DataBase = require("./database");

const { to, TE } = require("../../helper");

const getPhisData = async () => {
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

const getPhi = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const createPhiData = async (data) => {
  const createSingleRecode = DataBase.createSingleRecode(data);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const updatePhiData = async (filter, updateData) => {
  const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

  const [err, result] = await to(updateRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const phiData = await DataBase.findByQuery({ where: filter });

  return phiData[0];
};

const deletePhiData = async (data) => {
  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getPhisData,

  getPhi,

  createPhiData,

  updatePhiData,

  deletePhiData,
};
