const Rate = require("../../models/rate");
const subscribers = {};

const get = async (req, res) => {
  const { user_id } = req.query;
  try {
    const rates = await Rate.find({ user: user_id }).populate([
      {
        path: "book",
        populate: [
          {
            path: "authorId",
          },
          {
            path: "categoryId",
          },
        ],
      },
      { path: "user" },
    ]);
    return res.status(200).json(rates);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const rate = await Rate.findById(id).populate([
      {
        path: "book",
        populate: [
          {
            path: "authorId",
          },
          {
            path: "categoryId",
          },
        ],
      },
      { path: "user" },
    ]);
    res.status(200).json(rate);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const post = async (req, res) => {
  // const { rate, user, book, status } = req.body;
  try {
    const newRate = new Rate(req.body);
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Rate.findByIdAndDelete(id);
    res.status(200).json("Deleted Successfully.");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const update = async (req, res) => {
  const { id } = req.params;
  const { rate, status, user, book } = req.body;
  // if (!rate) {
  //   return res.status(400).json("Rate is required");
  // }
  // if (!status) {
  //   return res.status(400).json("Status is required");
  // }
  try {
    await Rate.findByIdAndUpdate(id, { rate, status, user, book });
    return res.status(200).json("Updated");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = { get, getOne, post, remove, update };
