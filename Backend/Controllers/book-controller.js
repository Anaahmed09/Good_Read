const Book = require("../models/book-model");
const APIFeatures = require("../utils/api-features");

exports.getAllBooks = async (req, res) => {
  try {
    const features = new APIFeatures(Book.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const books = await features.query;

    res.status(200).json({
      status: "success",
      result: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get book by id
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.creatBook = async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get("host")}`;
    const book = new Book({
      ...req.body,
      coverImage: `${url}/uploads/${req.file.filename}`,
    });
    await book.save();
    res.status(201).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};
