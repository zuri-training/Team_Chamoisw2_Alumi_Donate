const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  donationLink: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const College = mongoose.model("College", collegeSchema);
module.exports = College;