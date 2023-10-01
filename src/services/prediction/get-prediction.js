const axios = require("axios");

const { TE } = require("../../helper");

const { AI_SERVICE } = require("../../../config/config").APPLICATION;

const getPredictData = async (review) => {
  try {
    let predict = "";

    const response = await axios.post(`${AI_SERVICE}/send`, {
      message: review,
    });

    if (response.data) {
      if (response.data.prediction == "Negative") {
        predict = "bad";
      } else if (response.data.prediction == "Positive") {
        predict = "good";
      }
    } else TE("Result not found");

    return predict;
  } catch (error) {
    console.log(error);
    TE(error);
  }
};

module.exports = {
  getPredictData,
};
