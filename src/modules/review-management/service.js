const Constants = require("./constants");

const DataBase = require("./database");

const PhiDataBase = require("../phi-management/database");

const UserDataBase = require("../user-management/database");

const RestaurantDataBase = require("../restaurant-management/database");

const { to, TE } = require("../../helper");

const { MailService } = require("../../services/mail");

const { ModelPredictionService } = require("../../services/prediction");

const User = require("../user-management/user");
const Restaurant = require("../restaurant-management/restaurant");

const _getRestaurantData = async (filter) => {
  const getRestaurantRecode = RestaurantDataBase.findOneByQuery({
    where: filter,
  });

  const [error, res] = await to(getRestaurantRecode);
  if (error) TE(error);

  if (!res) TE("Restaurant data are not found");

  return res ? res.dataValues : null;
};
const _getPhiData = async (filter) => {
  const getPhiRecodes = PhiDataBase.findByQuery({
    where: filter,
  });

  const [error, res] = await to(getPhiRecodes);
  if (error) TE(error);

  if (!res) TE("Phi data are not found");

  return res;
};

const _getUserData = async (filter) => {
  const getUserRecodes = UserDataBase.findOneByQuery({
    where: filter,
  });

  const [error, res] = await to(getUserRecodes);
  if (error) TE(error);

  if (!res) TE("User data are not found");

  return res ? res.dataValues : null;
};

const getReviewsData = async (filter) => {
  const getRecodes = DataBase.findByQuery({
    include: [User, Restaurant],
    where: filter,
    order: [["createdAt", "DESC"]],
  });

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result.map((review) => {
    const { name } = review.dataValues.user.dataValues;
    const { restaurantName } = review.dataValues.restaurant.dataValues;
    delete review.dataValues.user;
    delete review.dataValues.restaurant;

    return { ...review.dataValues, userName: name, restaurantName };
  });
};

const getReview = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    include: [User, Restaurant],
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const { name } = result.dataValues.user.dataValues;

  const { restaurantName } = result.dataValues.restaurant.dataValues;

  delete result.dataValues.user;

  delete result.dataValues.restaurant;

  return { ...result.dataValues, userName: name, restaurantName };
};

const createReviewData = async (data) => {
  const { phiArea, reviewDetails, restaurantId } = data;

  const status = await ModelPredictionService.getPredictData(reviewDetails);

  data.status = status;

  const createSingleRecode = DataBase.createSingleRecode(data);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  result.dataValues.isMessageSend = false;

  if (status == "bad") {
    console.log("sending message to phi");
    const phiRes = await _getPhiData({ phiArea: phiArea });

    const restaurantRes = await _getRestaurantData({ id: restaurantId });

    for (let i = 0; i < phiRes.length; i++) {
      const { userId } = phiRes[i];

      const userRes = await _getUserData({ id: userId });

      const { email } = userRes;

      const sendMailData = {
        toEmail: email,
        subject: "Inform to bad restaurant",
        body: `<p> ABD</p>
        <br/> <br/> <p> Restaurant : ${restaurantRes.restaurantName}
        <br/> <p> Phi Area : ${phiArea}
        <br/> <p> Restaurant Address : ${restaurantRes.address}
        <br/> Review :  ${reviewDetails}</p>`,
      };
      console.log(
        "🚀 ~ file: service.js:153 ~ createReviewData ~ sendMailData:",
        sendMailData
      );

      const resultMessage = await MailService.mailSender(sendMailData);

      if (resultMessage) {
        result.dataValues.isMessageSend = true;
        result.dataValues.message = resultMessage;
      }
    }
  }

  return result;
};

const updateReviewData = async (filter, updateData) => {
  const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

  const [err, result] = await to(updateRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const reviewData = await getReview(filter);

  return reviewData;
};

const deleteReviewData = async (data) => {
  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getReviewsData,

  getReview,

  createReviewData,

  updateReviewData,

  deleteReviewData,
};
