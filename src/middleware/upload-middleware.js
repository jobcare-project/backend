const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-jobcare-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
  fileFilter: imageFilter,
}).single("file");
// const upload = multer({ storage: storage }).single("file");

module.exports = upload;
