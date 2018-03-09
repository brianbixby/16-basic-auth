'use strict';

const request = require('superagent');
const server = require('../server.js');
const serverToggle = require('../lib/server-toggle.js');

const Photo = require('../model/photo.js');
const User = require('../model/user.js');
const List= require('../model/list.js');

require('jest');

const url = 'http://localhost:3000';

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

const exampleList = {
  name: 'example list',
  desc: 'example list desc',
};

const examplePhoto = {
  name: 'example photo',
  desc: 'example photo description',
  image: `${__dirname}/../data/tester.jpg`,
};

describe('Photo Routes', function() {
  beforeAll( done => {
    serverToggle.serverOn(server, done);
  });
  
  afterAll( done => {
    serverToggle.serverOff(server, done);
  });

  afterEach( done => {
    Promise.all([
      Photo.remove({}),
      User.remove({}),
      List.remove({}),
    ])
      .then( () => done())
      .catch(done);
  });

  describe('POST: /api/list/:listID/photo', function() {
    describe('with a valid token and valid data', function() {
      beforeEach( done => {
        new User(exampleUser)
          .generatePasswordHash(exampleUser.password)
          .then( user => user.save())
          .then( user => {
            this.tempUser = user;
            return user.generateToken();
          })
          .then( token => {
            this.tempToken = token;
            done();
          })
          .catch(done);
      });

      // separate before each's because they are separate concerns 
      beforeEach( done => {
        exampleList.userID = this.tempUser._id.toString();
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      
      afterEach( done => {
        delete exampleList.userID;
        done();
      });

      it('should return a object containing our photo url', done => {
        request.post(`${url}/api/list/${this.tempList._id}/photo`)
          .set({
            Authorization: `Bearer ${this.tempToken}`,
          })
          .field('name', examplePhoto.name)
          .field('desc', examplePhoto.desc)
          .attach('image', examplePhoto.image)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(examplePhoto.name);
            expect(res.body.desc).toEqual(examplePhoto.desc);
            expect(res.body.listID).toEqual(this.tempList._id.toString());
            done();
          // expect(typeof res.body.imageURI).toEqual('string');
          });
      });
    });
  });
}); 