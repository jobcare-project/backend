const express = require("express");
const userRoutes = express.Router();

const {
  verifyToken,
  checkUserRole,
  checkAdmin,
} = require("../middleware/auth-middleware");
const {
  updateUserProfile,
  assessRecuiter,
  getDetailRecruiter,
  getAllUsers,
  deleteUser,
} = require("../controllers/user-controller");
const upload = require("../middleware/upload-middleware");
const resizer = require("../middleware/resizer-middleware");

// @route GET api/user
// @desc Get all user profile in DB
// @access private
userRoutes.get("/", verifyToken, checkAdmin, getAllUsers);

// @route POST api/user/update
// @desc Update profile a user
// @access private
userRoutes.post("/update", verifyToken, upload, resizer, updateUserProfile);

// @route POST api/user/assess
// @desc Assess  a recruiter
// @access private
userRoutes.post("/assess", verifyToken, checkUserRole, assessRecuiter);

// @route GET api/user/id
// @desc Get detail of recruiter
// @access public
userRoutes.get("/:id", getDetailRecruiter);

// @route DELETE api/user/id
// @desc Delete a user
// @access private
userRoutes.delete("/:id", verifyToken, checkAdmin, deleteUser);

module.exports = userRoutes;
