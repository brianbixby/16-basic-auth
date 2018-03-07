'use strict';

const request = require('superagent');
const mongoose = require('mongoose');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');

const User = require('../model/user.js');
const List = require('../model/list.js');

require('jest');
const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

const exampleList = {
  name: 'test list',
  desc: 'test list desc',
};

describe('List routes', function() {
  beforeAll(done => {
    serverToggle.serverOn(server, done);
  });
  afterAll(done => {
    serverToggle.serverOff(server, done);
  });
  afterEach( done => {
    Promise.all([
      User.remove({}),
      List.remove({}),
    ])
      .then( () => done())
      .catch(done);
  });

  describe('POST: /api/list', () => {
    beforeEach( done => {
      new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          console.log('this.tempuser ', this);
          this.tempUser = user;
          return user.generateToken();
        })
        .then( token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
    });

    it('should return a list', done => {
      request.post(`${url}/api/list`)
        .send(exampleList)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.desc).toEqual(exampleList.desc);
          expect(res.body.name).toEqual(exampleList.name);
          expect(res.body.userID).toEqual(this.tempUser._id.toString());
          done();
        });
    });
  });

  describe('GET: /api/list/:listId', () => {
    beforeEach( done => {
      new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
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

    beforeEach( done => {
      exampleList.userID = this.tempUser._id.toString();
      new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
    });

    afterEach( () => {
      delete exampleList.userID;
    });

    it('should return a list', done => {
      request.get(`${url}/api/list/${this.tempList._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(exampleList.name);
          expect(res.body.desc).toEqual(exampleList.desc);
          expect(res.body.userID).toEqual(this.tempUser._id.toString());
          done();
        });
    });
  });

});