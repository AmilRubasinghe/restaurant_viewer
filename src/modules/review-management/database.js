const Review = require("./review");

const createSingleRecode = async (singleRecode) => {
  return await Review.create(singleRecode);
};

const deleteSingleRecode = async (data) => {
  const result = await Review.destroy({ where: { id: data.id } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await Review.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
  await Review.update(dataNeedToUpdate, condition);

const findOneByQuery = async (query) => await Review.findOne(query);

const findByQuery = async (query) => await Review.findAll(query);

module.exports = {
  Schema: Review,

  updateRecode: updateRecode,

  findOneByQuery,

  findByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
