const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationsSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'College'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  paymentReference: {
    type: Number,
    required: true
  }
},{
  timestamps: true
});

module.exports = mongoose.model("Donation", donationsSchema);
