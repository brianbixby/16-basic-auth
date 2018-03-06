'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Promise = require('bluebird');
const debug = require('debug')('16-basic-auth:user');

const userSchema = mongoose.Schema({
  username: {type: String, require: true, unique: true },
  email: {type: String, require: true, unique: true },
  password: {type: String, require: true},
  findHash: { type: String, unique: true},
});