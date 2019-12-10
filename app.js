var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')

const cors = require('cors')

var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');

require('./db/connection')

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
