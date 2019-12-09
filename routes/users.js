var express = require('express')
var router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/login', function(req, res) {
  let { email, password } = req.body

  User.findOne({ email }, (err, user) => {
    if (user) {
      
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.send({ error })
        } else {
          if (!result) {
            const error = {
              confirmation: false,
              message: 'incorrect email or password',
              status: 400
            }

            return res.send({ error })
          } else {
            const payload = {
              id: user.id,
              email: user.email
            }

            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (error) {
                  res.json({ error })
                } else {
                  let success = {
                    confirmation: true,
                    message: 'successfully logged in',
                    token: `Bearer ${token}`
                  }

                  //success to login
                  return res.send(success)
                }
              }
            )
          }
        }
      })
    } else {
      res.send({ error: 'User does not exist'})
    }
  })
})

router.post('/signup', function (req, res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  })

  newUser.save().then(user => {
    const payload = {
      id: user.id,
      email: user.email
    }

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) return res.send({ error })

        let success = {
          email: user.email,
          confirmation: true,
          token: `Bearer ${token}`
        }

        return res.send(success)
      }
    )
  })
  .catch(error => res.send({ error }))
})

module.exports = router
