let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  content: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false }
})

module.exports = mongoose.model('Order', orderSchema)
