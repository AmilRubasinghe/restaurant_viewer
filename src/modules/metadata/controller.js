const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const getMetaData = async (req, res) => {
  try {
    const result = await Service.getMetaData();

    SUCCESS(res, 200, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getMetaData,
};
