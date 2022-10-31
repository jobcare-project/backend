const express = require("express");
const uploadRoutes = express.Router();

const upload = require("../middleware/upload-middleware");
const { uploadImage } = require("../controllers/upload-controller");
const { verifyToken } = require("../middleware/auth-middleware");
const resizer = require("../middleware/resizer-middleware");

// @route POST api/upload/
// @desc Create a new image
// @access private
uploadRoutes.post("/", verifyToken, upload, resizer, uploadImage);

module.exports = uploadRoutes;
