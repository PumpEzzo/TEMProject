const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  idNo: String,
  carNo: String,
  agreed: String,
  birthday: String,
  email: String,
  password: String,
  parkedHis: {type: [mongoose.Schema.Types.ObjectId], ref:"Parking"},
  });

userSchema.statics.validate = async function(email, password){
  const foundUser = await this.findOne({ email });
  if(!foundUser) return false;
  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
}

userSchema.pre ('save', async function (next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

module.exports = mongoose.model("User", userSchema);
