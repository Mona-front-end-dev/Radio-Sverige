const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.post("/addFavoriteChannel/:channelId", userController.addToChannelFavoriteList);
router.post("/addFavoriteProgram/:programId", userController.addToProgramFavoriteList);


module.exports = router;
