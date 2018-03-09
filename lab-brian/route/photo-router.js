'use strict';

const fs = require('fs');
const path = require('path');
// gets path of file and can deconstruct it then hash it
const del = require('del');
// delete file after we made upload
const AWS = require('aws-sdk');
// used to actually make the upload
const multer = require('multer');
// extra layer and allows us to upload an image as a multi part file
const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('16-basic-auth:photo-router');

const Photo = require('../model/photo.js');
const List = require('../model/list.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const photoRouter = module.exports = Router();

AWS.config.setPromisesDependency(require('bluebird'));
//allows us to use promises with aws

const s3 = new AWS.S3();
// instantiates new s3 module object which has a bunch of methods on it
console.log('s3: ', s3);

const dataDir = `${__dirname}/../data`;
// will have file ready to be uploaded for our app; but we need a file in our file system
const upload = multer({ dest: dataDir});
// multer allows us to upload multipart form

function s3uploadProm(params) {
  debug('s3uploadProm');

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      // s3 gives us access to uploade method
      // if(err) reject(err);
      console.log('s3data: ', s3data);
      resolve(s3data);
    });
  });
}

// must have bearer auth in route if you want to limit access, or else anyone can access page
// upload comes from multer
photoRouter.post('/api/list/:listID/photo', bearerAuth, upload.single('image'), function(req, res, next) {
  debug('POST: /api/list/:listID/photo');
  // multer attaches a file property to our request

  if(!req.file) {
    return next(createError(400, 'file not found'));
  }

  if(!req.file.path) {
    return next(createError(500, 'file not saved'));
  }

  let ext = path.extname(req.file.originalname);
  // path built in node module allows us to get path of files, req.file.originalname is given to us by multer

  let params = {
    ACL: 'public-read',
    // acl is access control lost, what kind of access do you have to this servive and we want public read access
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
    // key is the name of the file, when it get uploaded to s3
    // body is the image; attaches image to body
  };

  List.findById(req.params.listID)
    .then( () => s3uploadProm(params))
    .then( s3data => {
      console.log('s3 response: ', s3data);
      del([`${dataDir}/*`]);

      let photoData = {
        name: req.body.name,
        desc: req.body.desc,
        objectKey: s3data.Key, //s3data.key 
        imageURI: s3data.Location,
        userID: req.user._id,
        listID: req.params.listID,
      };

      return new Photo(photoData).save();
    })
    .then( photo => res.json(photo))
    .catch( err => next(err));
});