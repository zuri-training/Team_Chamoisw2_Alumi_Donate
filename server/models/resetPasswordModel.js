const mongoose = require("mongoose");
const { Schema } = mongoose;

const resetPasswordSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 3600000,
  }
});

module.exports = mongoose.model("ResetPassword", resetPasswordSchema);
