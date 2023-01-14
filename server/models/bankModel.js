const mongoose = require('mongoose')

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  code: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Bank', BankSchema)