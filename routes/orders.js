const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Order = require('../models/order')

/* GET users listing. */
router.get('/', (req, res) => {
  console.log(req.query.id)
  User.findById(req.query.id)
    .populate('orders')
    .exec((error, user) => {
      if (error) {
        return res.send({ error })
      } else {
        return res.send({ user })
      }
    })
})

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('create order route')
  }
)

module.exports = router
