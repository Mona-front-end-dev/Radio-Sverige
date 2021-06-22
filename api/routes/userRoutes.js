const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/register", userController.register);
router.get("/getFavoriteChannels", userController.getFavoriteChannels);
router.post("/addFavoriteChannel/:channelId", userController.addToChannelFavoriteList);
router.delete("/deleteFavoriteChannel/:channelId", userController.deleteFromChannelFavoriteList);
router.post("/addFavoriteProgram/:programId", userController.addToProgramFavoriteList);


module.exports = router;
