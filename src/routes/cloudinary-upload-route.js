const express = require("express");
const fileUploader = require("../config/cloudinary.config.js");

const cloudinaryRoutes = express.Router();

cloudinaryRoutes.post("/", fileUploader.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ image_url: req.file.path });
});

module.exports = cloudinaryRoutes;
