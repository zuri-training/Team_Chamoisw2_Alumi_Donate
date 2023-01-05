const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'College'
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gradYear: {
    type: Number,
    required: true,
  },
  newsletterSub: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
