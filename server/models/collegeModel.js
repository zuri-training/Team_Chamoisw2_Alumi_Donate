const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const collegeSchema = new Schema({
  collegeName: {
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
  }
});

const College = mongoose.model("College", collegeSchema);
module.exports = College;