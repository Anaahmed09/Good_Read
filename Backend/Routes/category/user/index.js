const router = require("express").Router();
const categoryRouter = require("./category.routes");
router.use("/categories", categoryRouter);
module.exports = router;
