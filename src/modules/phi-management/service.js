const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const userService = require("../common/service");

const { MailService } = require("../../services/mail");

const generator = require("generate-password");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");

const _createPhiAsUser = async (data) => {
  try {
    const { phiName, registrationNo, email, contactNumber } = data;

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const createUserSchema = {
      name: phiName,
      userName: registrationNo,
      password: password,
      contactNumber: contactNumber,
      email: email,
      role: "phi",
    };

    const user = await userService.createUser(createUserSchema);

    console.log("Phi user created");

    const sendMailData = {
      toEmail: email,
      subject: "System login as a PHI",
      body: `<p>Your user name :</p>  <h5> ${registrationNo}</h5> <br/>
      <p>Your  password :</p>  <h5> ${password}</h5>`,
    };

    const result = await MailService.mailSender(sendMailData);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPhisData = async (params) => {
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
  const getRecode = DataBase.findByQuery({
    where: {
      [Op.or]: [{ registrationNo: data.registrationNo }, { email: data.email }],
    },
  });

  const [error, resultData] = await to(getRecode);

  if ((resultData && resultData.length <= 0) || resultData == null) {
    const createSingleRecode = DataBase.createSingleRecode(data);

    const [err, result] = await to(createSingleRecode);

    if (err) TE(err);

    if (!result) TE("Result not found");

    const phiUser = await _createPhiAsUser(data);

    if (!phiUser) TE("Email is not send");

    return result;
  } else {
    TE("Registration number or email already exist ");
  }

  if (error) TE(error);
};

const updatePhiData = async (filter, updateData) => {
  const { registrationNo = null, email = null } = updateData;

  if (registrationNo || email) {
    const getRecode = DataBase.findByQuery({
      where: {
        [Op.or]: [{ registrationNo: registrationNo }, { email: email }],
      },
    });

    const [error, resultData] = await to(getRecode);
    if (resultData && resultData.length > 0) {
      TE("Registration number or email already exist ");
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
