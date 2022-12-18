const express = require("express");
const authRoutes = require("./auth-route");
const userRoutes = require("./user-route");
const jobRoutes = require("./job-route");
const assessRoutes = require("./assess-route");
const applicantsRoutes = require("./applicants-route");
const uploadRoutes = require("./upload-route");
const registeredTrialRoutes = require("./registeredTrial-route");
const savedRecruitmentRoutes = require("./savedRecruitment-route");
const chartRoutes = require("./chart-route");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/job", jobRoutes);
router.use("/api/assess", assessRoutes);
router.use("/api/applicants", applicantsRoutes);
router.use("/api/upload", uploadRoutes);
router.use("/api/registertrial", registeredTrialRoutes);
router.use("/api/saved-recruitment", savedRecruitmentRoutes);
router.use("/api/chart", chartRoutes);

module.exports = router;
