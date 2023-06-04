const Rate = require("../models/rate");

const getRate = async (req, res, next) => {
  let rateOrStatus;
  try {
    rateOrStatus = await Rate.findById(req.params.id);
    if (rateOrStatus == null) {
      return res.status(404).json({ message: "Cannot find rate or status" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.rate = rateOrStatus;
  next();
};

module.exports = getRate;
