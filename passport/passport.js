const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')

const key = process.env.SECRET_KEY || 'defaultSecretKey'

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          console.log('user line 16: ', user)
          if (user) {
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          }
        })
        .catch(err => console.log(err))
    })
  )
}
