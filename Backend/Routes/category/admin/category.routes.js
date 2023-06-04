const express = require("express");
const router = express.Router();
const categoryController = require("../../../Controllers/category.controller");
router.post("/", categoryController.create);
router.delete("/:id", categoryController.remove);
router.put("/:id", categoryController.update);

module.exports = router;
