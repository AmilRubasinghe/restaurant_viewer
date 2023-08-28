const User = require("./user");

const createSingleRecode = async (singleRecode) => {
  return await User.create(singleRecode);
};

const deleteSingleRecode = async (data) => {
  const result = await User.destroy({ where: { id: data.id } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await User.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
  await User.update(dataNeedToUpdate, condition);

const findOneByQuery = async (query) => await User.findOne(query);

const findByQuery = async (query) => await User.findAll(query);

module.exports = {
  Schema: User,

  updateRecode: updateRecode,

  findOneByQuery,

  findByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
