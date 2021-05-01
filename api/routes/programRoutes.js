const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.get("/channel/:channelId", programController.getProgramsByChannelId);
router.get("/category/:categoryId", programController.getProgramsByCategoryId);
router.get("/:programId", programController.getProgramById);

module.exports = router;