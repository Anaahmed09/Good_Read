const Category = require("../models/category.model");
const bookModel = require("../models/book");
const rateModel = require("../models/rate");
const joi = require("joi");
const validationCategory = joi.object({
  name: joi.string().required(),
});
class CategoryController {
  async findAll(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async popular(req, res) {
    try {
      const categories = await rateModel.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        {
          $group: {
            _id: "$book",
            averageRate: { $avg: "$rate" },
            categoryId: {
              $first: { $arrayElemAt: ["$bookInfo.categoryId", 0] },
            },
          },
        },
        {
          $group: {
            _id: "$categoryId",
            averageRateOfAllCategory: { $avg: "$averageRate" },
          },
        },
        { $sort: { averageRateOfAllCategory: -1 } },
        { $limit: 5 },
      ]);
      const ids = categories.map(({ _id }) => _id);
      const categoryNames = await Category.find({ _id: { $in: ids } });
      return res.status(200).json(categoryNames);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async findOne(req, res) {
    const id = req.params.id;
    try {
      const category = await Category.findById(id);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async create(req, res) {
    const validation = validationCategory.validate(req.body);
    if (validation.error)
      return res.status(500).send("name must be string & required");
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async remove(req, res) {
    const id = req.params.id;
    try {
      await bookModel.deleteMany({ categoryId: id });
      await Category.deleteOne({ _id: id });
      return res.status(204).send("");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  async update(req, res) {
    const validation = validationCategory.validate(req.body);
    if (validation.error)
      return res.status(500).send("name must be string & required");
    const id = req.params.id;
    try {
      const category = await Category.findByIdAndUpdate(id, req.body);
      return res.status(201).send("");
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async findBooks(req, res) {
    try {
      const books = await bookModel
        .find({ categoryId: req.params.id })
        .populate("categoryId");
      return res.status(200).json(books);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = new CategoryController();
