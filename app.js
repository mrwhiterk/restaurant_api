const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')

const cors = require('cors')

const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')

require('./db/connection')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)

module.exports = app
