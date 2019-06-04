import { describe, it } from 'mocha';
import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Post a car a sale ad', () => {
  it('user should be able to post a car sale ad', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const carAd = {
      owner: 1,
      email: 'brown@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      productImage: 'url',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return 401 if user is not authorized', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return 404 if user is not in the database', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const carAd = {
      owner: 1,
      email: 'newuser@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      productImage: 'url',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return 404 if owner id is not specified', (done) => {
    const user = {
      email: 'jordan@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const carAd = {
      owner: 120,
      email: 'newuser@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      productImage: 'url',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 400 if there is a missing info', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 400 if any field is empty', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 401 if there is an invalid token', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET', { expiresIn: '3sec' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
});
