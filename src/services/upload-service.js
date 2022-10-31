const fs = require("fs");
// const sharp = require("sharp");

const {
  returnResponse,
  returnResponseServerError,
} = require("../common/response");
const { createImageServer } = require("../repository/upload-repo");
const { updateProfile } = require("../repository/user-repo");
const { statusCode, apiMessage } = require("../utils/constants");

const uploadImageService = async (req, res) => {
  try {
    const file = req.file;
    // const buffer = file.buffer;

    if (file == undefined) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_MISSING));
    }

    // const imageBuffer = await sharp(buffer)
    //   .resize({ width: 700 })
    //   .jpeg({ quality: 100 })
    //   .toBuffer();

    fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );

    const newImage = await createImageServer({
      type: file.mimetype,
      name: file.originalname,
      data: file.buffer,
    });

    if (newImage) {
      await updateProfile(req.id, { imageId: newImage.dataValues.id });

      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + newImage.name,
        newImage.data
      );
      return res
        .status(statusCode.OK)
        .json(returnResponse(true, apiMessage.SUCCESS, newImage));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = { uploadImageService };
