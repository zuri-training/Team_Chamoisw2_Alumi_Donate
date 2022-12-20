const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  }
});

module.exports = mongoose.model("College", collegeSchema);
