const express = require("express");
const userController = require("../controllers/user");
const { protect, authorize } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.get("/", protect, authorize("admin"), userController.findAll);

module.exports = userRouter;
