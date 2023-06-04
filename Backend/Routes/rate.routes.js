const express = require("express");
const Router = express.Router();
const getOneRateOrStatus = require("../middleware/getRateOrStatus");
const rateController = require("../Controllers/Rate/rate.controller");

Router.get("/", rateController.get);

Router.get("/:id", getOneRateOrStatus, rateController.getOne);

Router.post("/", rateController.post);

Router.delete("/:id", getOneRateOrStatus, rateController.remove);

Router.put("/:id", getOneRateOrStatus, rateController.update);

module.exports = Router;
