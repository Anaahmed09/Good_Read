const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    min: 5,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: false,
  },
});

module.exports = mongoose.model("Book", bookSchema);
