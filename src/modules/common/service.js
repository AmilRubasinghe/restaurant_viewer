const Constants = require("./constants");

const DataBase = require("../user-management/database");

const Sequelize = require("sequelize");

const { ACCESS_TOKEN } = require("../../../config/config").ACCESS;

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const generator = require("generate-password");

const { MailService } = require("../../services/mail");

const salt = bcrypt.genSaltSync(10);

const { to, TE } = require("../../helper");

const _findRecode = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [error, resultData] = await to(getRecode);

  if (error) TE(error);

  if ((resultData && resultData.length <= 0) || resultData == null)
    TE("Incorrect Username");

  return resultData?.dataValues;
};

const login = async (data) => {
  try {
    const { password, userName } = data;

    const resultData = await _findRecode({ userName: userName, active: true });

    if (bcrypt.compareSync(password, resultData.password)) {
      const response = {
        email: resultData.email,
        role: resultData.role,
        name: resultData.name,
        id: resultData.id,
      };

      const accessToken = jwt.sign(response, ACCESS_TOKEN, {
        expiresIn: "8h",
      });

      return { token: accessToken, role: resultData.role, id: resultData.id };
    } else {
      TE("Incorrect Password");
    }
  } catch (error) {
    TE(error);
  }
};

const createUser = async (data) => {
  let storeData = data;

  storeData.password = bcrypt.hashSync(data.password, salt);

  const getRecode = DataBase.findByQuery({
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
    TE("User name or email already exist ");
  }

  if (error) TE(error);
};

const passwordRest = async (data) => {
  try {
    const { currentPassword, userName, oldPassword } = data;

    const updateData = { password: bcrypt.hashSync(currentPassword, salt) };

    const filter = { userName: userName, active: true };

    const resultData = await _findRecode(filter);

    if (bcrypt.compareSync(oldPassword, resultData.password)) {
      const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

      const [err, result] = await to(updateRecode);

      if (err) TE(err);

      if (result && result.length <= 0) TE("Result not found");

      const userData = await DataBase.findOneByQuery({ where: filter });

      return userData;
    } else {
      TE(" Old Password is incorrect");
    }
  } catch (error) {
    TE(error);
  }
};

const forgetPassword = async (data) => {
  try {
    const filter = { userName: data.userName };

    const resultData = await _findRecode(filter);

    const email = resultData.email;

    const password = generator.generate({
      length: 6,
      numbers: true,
      uppercase: false,
      lowercase: false,
    });

    const updateData = { password: bcrypt.hashSync(password, salt) };

    const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

    const [err, updatedResult] = await to(updateRecode);

    if (err) TE(err);

    if (!updatedResult) TE("Result not found");

    const sendMailData = {
      toEmail: email,
      subject: "Reset your password",
      body: `<p>Your Otp :</p> <br/> <h2> ${password}</h2>`,
    };

    const result = await MailService.mailSender(sendMailData);
    return result;
  } catch (error) {
    TE(error);
  }
};

module.exports = {
  login,
  createUser,
  passwordRest,
  forgetPassword,
};
