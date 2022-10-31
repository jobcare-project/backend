const { uploadImageService } = require("../services/upload-service");

const uploadImage = async (req, res) => {
  return await uploadImageService(req, res);
};

module.exports = { uploadImage };
