const { Images } = require("../database/models");

const createImageServer = async (data) => {
  const newImage = Images.create(data);

  return newImage;
};

module.exports = { createImageServer };
