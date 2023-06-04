// const mongoose = require("mongoose");

// const authorSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//       required: [true, "Book must have a title"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Book must have a price"],
//     },
//     description: {
//       type: String,
//       trim: true,
//       required: false,
//     },
//     pages: {
//       type: Number,
//       required: false,
//     },

//     publisher: {
//       type: String,
//       trim: true,
//       required: false,
//     },
//     publicationDate: {
//       type: Date,
//       required: false,
//     },
//     coverImage: {
//       type: String,
//       required: [true, "Author must have an image"],
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Author",
//     },
//   },
//   { timestamps: true }
// );

// const Book = mongoose.model("Book", authorSchema);
// module.exports = Book;
