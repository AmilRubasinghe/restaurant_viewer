const Phi = require("./phi");

const createSingleRecode = async (singleRecode, options) => {
  return await Phi.create(singleRecode, options);
};

const deleteSingleRecode = async (data) => {
  const result = await Phi.destroy({ where: { id: data.id } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await Phi.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate, options) =>
  await Phi.update(dataNeedToUpdate, condition, options);

const findOneByQuery = async (query) => await Phi.findOne(query);

const findByQuery = async (query) => await Phi.findAll(query);

module.exports = {
  Schema: Phi,

  updateRecode: updateRecode,

  findOneByQuery,

  findByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
