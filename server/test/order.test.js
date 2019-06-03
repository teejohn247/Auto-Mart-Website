import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Purchasing order', () => {
  it('should return a 200 if buyer is able to make a purchase order', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      buyer: 1,
      car_id: 1,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 401 code if buyer is not authorized', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 404 if buyer is not in the database', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      buyer: 30,
      car_id: 1,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 404 if car id is not found', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      buyer: 1,
      car_id: 10,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to make a purchasing order when there is a missing info', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if buyer input a wrong datatype', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      buyer: 1,
      car_id: 10,
      amount: 'two',
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
