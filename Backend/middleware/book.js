const bookModel = require("../models/book");
class myBook {
  findBook(req, res, next) {
    try {
      const id = req.params.id;
      bookModel
        .findOne({ _id: id })
        .then((book) => {
          if (book) {
            next();
          } else {
            res.status(404).json(" Book Not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = new myBook();
