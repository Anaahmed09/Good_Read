const express = require("express");
const router = express.Router();
const categoryController = require("../../../Controllers/category.controller");
router.get("/", categoryController.findAll);
module.exports = router;
