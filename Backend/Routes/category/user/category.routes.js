const express = require("express");
const router = express.Router();
const categoryController = require("../../../Controllers/category.controller");
router.get("/:id/books", categoryController.findBooks);
router.get("/popular", categoryController.popular);
module.exports = router;
