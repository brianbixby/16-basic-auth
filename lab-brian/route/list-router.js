'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('16-basic-auth:list-router');

const List = require('../model/list.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const listRouter = module.exports = Router();

listRouter.post('/api/list', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/list');

  req.body.userID = req.user._id;
  new List(req.body).save()
    .then( list => res.json(list))
    .catch(next);
});

listRouter.get('/api/list/:listId', bearerAuth, function(req, res, next) {
  debug('GET: /api/list/:listID');

  List.findById(req.params.listId)
    .then( list => res.json(list))
    .catch(next);
});