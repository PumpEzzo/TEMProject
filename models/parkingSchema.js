const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema({location: String, expireAt:Date }, {timestamps: true});


module.exports = mongoose.model("Parking", parkingSchema);
