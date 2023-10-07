const DataBase = require("./database");

const UserDataBase = require("../user-management/database");

const Sequelize = require("sequelize");

const sequelize = require("../../../config/database");

const userService = require("../common/service");

const { MailService } = require("../../services/mail");

const generator = require("generate-password");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");

const User = require("../user-management/user");

const getPhisData = async (params) => {
  const filter = { active: true, ...params };

  const userParams = {};

  if (params.email) userParams.email = params.email;

  if (params.phiName) userParams.name = params.phiName;

  delete filter.email;

  delete filter.phiName;

  const getRecodes = DataBase.findByQuery({
    include: [{ model: User, where: userParams, required: true }],
    where: filter,
    order: [["createdAt", "DESC"]],
  });

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result.map((phi) => {
    const { name, email, contactNumber } = phi.dataValues.user.dataValues;
    delete phi.dataValues.user;
    return { ...phi.dataValues, phiName: name, email, contactNumber };
  });
};

const getPhi = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    include: [User],
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const { name, email, contactNumber } = result.dataValues.user.dataValues;

  delete result.dataValues.user;

  return { ...result.dataValues, phiName: name, email, contactNumber };
};

const createPhiData = async (data) => {
  const t = await sequelize.transaction();

  const { phiName, registrationNo, email, contactNumber, address, phiArea } =
    data;

  try {
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: "!@#$&*~",
    });

    const createUserSchema = {
      name: phiName,
      userName: registrationNo.toLowerCase(),
      password: password,
      contactNumber: contactNumber,
      email: email,
      role: "phi",
    };

    const user = await userService.createUser(createUserSchema, {
      transaction: t,
    });

    const createRecord = DataBase.createSingleRecode(
      {
        registrationNo,
        address,
        phiArea,
        userId: user.dataValues.id,
      },
      { transaction: t }
    );
    const [err, phi] = await to(createRecord);

    if (err) TE(err.errors[0]?.message);

    if (!phi) TE("Result not found");

    await t.commit();

    console.log("Phi user created");

    const sendMailData = {
      toEmail: email,
      subject: "Restaurant Reviewer Credentials (PHI)",
      body: `<p>Your PHI username : </p>  <h5> ${registrationNo.toLowerCase()}</h5> <br/>
      <p>Your password : </p>  <h5> ${password}</h5> <br/><br/> <h4>Use this as your Restaurant Reviewer Site Login Credentials.</h4>`,
    };

    const result = await MailService.mailSender(sendMailData);

    return {
      ...phi.dataValues,
      phiName,
      email,
      contactNumber,
      messageId: result,
    };
  } catch (error) {
    await t.rollback();
    TE(error);
  }
};

const updatePhiData = async (filter, updateData) => {
  const t = await sequelize.transaction();

  try {
    const userParams = {};

    if (updateData.email) {
      userParams.email = updateData.email;
      delete updateData.email;
    }

    if (updateData.phiName) {
      userParams.name = updateData.phiName;
      delete updateData.phiName;
    }

    if (updateData.contactNumber) {
      userParams.contactNumber = updateData.contactNumber;
      delete updateData.contactNumber;
    }

    updateData.active
      ? (userParams.active = true)
      : (userParams.active = false);

    const updatePhiRecode = DataBase.updateRecode(
      { where: filter },
      updateData,
      { transaction: t }
    );

    const [err, result] = await to(updatePhiRecode);

    if (err) TE(err.errors[0] ? err.errors[0].message : err);

    if (!result) TE("Result not found");

    const phiData = await DataBase.findOneByQuery({ where: filter });

    const userFilter = { id: phiData.dataValues.userId };

    const updateUserRecode = UserDataBase.updateRecode(
      { where: userFilter },
      userParams,
      { transaction: t }
    );

    const [e, userResult] = await to(updateUserRecode);

    if (e) TE(e.errors[0] ? e.errors[0].message : e);

    if (!userResult) TE("Result not found");

    await t.commit();

    return phiData;
  } catch (error) {
    await t.rollback();
    TE(error);
  }
};

const deletePhiData = async (data) => {
  const phiData = await DataBase.findOneByQuery({ where: data });

  const userFilter = { id: phiData.dataValues.userId };

  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const deleteUserRecode = UserDataBase.deleteSingleRecode(userFilter);

  const [error, user] = await to(deleteUserRecode);

  if (error) TE(error);

  if (!user) TE("Result not found");

  return result;
};

module.exports = {
  getPhisData,

  getPhi,

  createPhiData,

  updatePhiData,

  deletePhiData,
};
