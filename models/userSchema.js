const mongoose = require("mongoose");

const schema = mongoose.Schema({
  fullname: String,
  age: Number,
  email: String,
  idNumber: String,
  carInfo: [String],
});

module.exports = mongoose.model("User", schema);
