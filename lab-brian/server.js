'use strict';

const express = require('express');
const debug = require('debug')('16-basic-auth:server');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

dotenv.load();

const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

const server = module.exports = app.listen(PORT, () => {
  debug(`server up ${PORT}`);
});

server.isRunning = true;