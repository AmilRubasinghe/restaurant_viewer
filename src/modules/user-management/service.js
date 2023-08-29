const DataBase = require("./database");

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

  const userData = await DataBase.findOneByQuery({ where: filter });

  return userData;
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

  updateUser,

  deleteUser,
};
