const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../Controllers/Users/user.controller");
const getOneUser = require("../middleware/getUser");
const User = require("../models/userModel");

router.get("/", userController.get);
router.get("/:id", getOneUser, userController.getOne);
router.post("/", userController.post);
router.patch("/:id", getOneUser, userController.update);
router.delete("/:id", getOneUser, userController.remove);

module.exports = router;
