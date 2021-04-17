const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema({location: String,}, {timestamps: true});


module.exports = mongoose.model("Parking", parkingSchema);
