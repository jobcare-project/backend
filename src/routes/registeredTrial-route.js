const express = require("express");
const registeredTrialRoutes = express.Router();

const { verifyToken, checkAdmin } = require("../middleware/auth-middleware");
const {
  getAllRegisteredTrial,
  addRegisterTrial,
} = require("../controllers/registeredTrial-controller");

// @route POST api/registertrial
// @desc register trial
// @access public
registeredTrialRoutes.post("/", addRegisterTrial);

// @route GET api/registertrial
// @desc get all registered trial
// @access private - admin only
registeredTrialRoutes.get("/", verifyToken, checkAdmin, getAllRegisteredTrial);

// @route PUT api/registertrial/:id
// @desc get all registered trial
// @access private - admin only
// registeredTrialRoutes.get("/", verifyToken, checkAdmin, getAllRegisteredTrial);

module.exports = registeredTrialRoutes;
