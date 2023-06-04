const express = require("express");
const router = express.Router();
const bookController = require("../Controllers/book-controller");
const upload = require("../utils/multer-upload");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
router.post("/", upload.single("coverImage"), bookController.creatBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
