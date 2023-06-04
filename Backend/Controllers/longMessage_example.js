const messageModel = require("../models/message");
const subscribers = {};
const { v4: uuid } = require("uuid");
const create = async (req, res) => {
  Object.keys(subscribers).forEach((key) => {
    subscribers[key].json(req.body);
    delete subscribers[key];
  });
  res.sendStatus(204);
  // try {
  //   const message = await messageModel.create(req.body);
  //   return res.status(201).json(message);
  // } catch (error) {
  //   return res.status(500).send(error);
  // }
};
const findAll = async (req, res) => {
  subscribers[uuid()] = res;
  // try {
  //   const messages = await messageModel.find();
  //   console.log(messages);
  //   return res.status(200).json(messages);
  // } catch (error) {
  //   return res.status(500).send(error);
  // }
};
const findOne = async (req, res) => {
  console.log(req.params);
  console.log("req.params");
  // try {
  //   const messages = await messageModel.findOne({});
  //   return res.status(200).json(messages);
  // } catch (error) {
  //   return res.status(500).send(error);
  // }
};
module.exports = { create, findAll, findOne };
