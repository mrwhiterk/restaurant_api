let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})


userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY)

  user.tokens = user.tokens.concat({
    token
  })

  await user.save()
  
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('wrong email or password')
  }
  
  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) {
    throw new Error('wrong email or password')
  }
  
  return user
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User
