const { object } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, maxlength: 100, minlength: 3 },
  lastname: { type: String, required: true, maxlength: 100, minlength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String, required: true },
  image: { type: String,required:true },
  role: { type: String, required: true },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
