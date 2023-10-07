const User = require("./user");

const createSingleRecode = async (singleRecode, options) => {
  return await User.create(singleRecode, options);
};

const deleteSingleRecode = async (data) => {
  const result = await User.destroy({ where: { id: data.id } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await User.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate, options) =>
  await User.update(dataNeedToUpdate, condition, options);

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
