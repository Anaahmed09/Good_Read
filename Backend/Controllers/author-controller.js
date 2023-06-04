const Author = require("../models/author-model");
// const Book = require("../models/book-model");
const Book = require("../models/book");
const APIFeatures = require("../utils/api-features");

exports.getAllAuthors = async (req, res) => {
  try {
    // BUILD QUERY
    const features = new APIFeatures(Author.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const authors = await features.query.populate("books");

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      result: authors.length,
      data: {
        authors: authors,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id).populate("books");
    author.books = await Book.find({ authorId: id });
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.creatAuthor = async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get("host")}`;
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      image: `${url}/uploads/${req.file.filename}`,
    });
    await author.save();
    res.status(201).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await Author.findByIdAndDelete(id);
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

// add book for specific author
// /authors/:id/books   POST
exports.addBookToAuthor = async (req, res) => {
  try {
    // const url = `${req.protocol}://${req.get("host")}`;
    const authorId = req.params.id;
    const { categoryId, name, photo } = req.body;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).send({
        status: "fail",
        message: "Aauthor not found",
      });
    }
    // const book = new Book({
    //   title: req.body.title,
    //   author: author._id,
    //   coverImage: `${url}/uploads/${req.file.filename}`,
    // });
    const book = new Book({
      ...req.body,
      authorId,
    });
    await book.save();
    author.books.push(book._id);
    await author.save();
    res.status(201).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// get books for specific author 'Must'
// /authors/:id/books   GET
exports.getAuthorBooks = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).send({
        status: "fail",
        message: "Aauthor not found",
      });
    }
    const books = await Book.find({ author: author._id });
    res.status(200).json({
      status: "success",
      result: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
