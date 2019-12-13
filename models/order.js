let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema(
  {
    content: [
      {
        name: String,
        price: Number,
        quantity: Number,
        totalPrice: Number
      }
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
    submitted: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', orderSchema)
