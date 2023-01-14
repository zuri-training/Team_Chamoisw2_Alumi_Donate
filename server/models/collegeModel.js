const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
    default: true
  },
  contact: {
    email: {
      type: String,
      default: '',
      unique: true
    },
    phoneNumbers: {
      type: [String],
      default: []
    }
  },
  accountDetails: {
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true,
    },
    bank: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Bank'
    }
  }
});

const College = mongoose.model("College", collegeSchema);
module.exports = College;