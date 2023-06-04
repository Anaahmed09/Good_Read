const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Author must have a first name"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Author must have a first name"],
    },
    image: { type: String, required: [true, "Author must have an image"] },
    dateOfBirth: {
      type: Date,
      required: [true, "Author must have a date of birth"],
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
