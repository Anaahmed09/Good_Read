const jwt = require("jsonwebtoken");
const config = process.env;
const userModel = require("../models/userModel");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const user_id = decoded.id;
    const user = await userModel.findOne({ _id: user_id });
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
