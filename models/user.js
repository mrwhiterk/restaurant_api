let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
