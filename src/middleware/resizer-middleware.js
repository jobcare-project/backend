const sharp = require("sharp");
const { returnResponseServerError } = require("../common/response");
const { statusCode } = require("../utils/constants");

const resizer = async (req, res, next) => {
  try {
    if (req.file) {
      const imageBuffer = await sharp(req.file.path)
        .resize({ width: 700 })
        .jpeg({ quality: 100, chromaSubsampling: "4:4:4" })
        .toBuffer();

      req.file.buffer = imageBuffer;
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = resizer;
