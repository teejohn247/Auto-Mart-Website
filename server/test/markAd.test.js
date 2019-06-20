import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Marking the posted car ad as sold', () => {
  it('should return a 200 if car is successfully marked as sold', (done) => {
    const user = {
      email: 'ajani2@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v1/car/2')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 401 when a user is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/car/2')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 404 if car is not found in the database', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v1/car/100')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 404 if all required inputs are not given', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .patch('/api/v1/car/2')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if there is a wrong input data', (done) => {
    const user = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const status = {
      status: 8,
    };
    chai.request(app)
      .patch('/api/v1/car/2')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 400 if user is trying to mark an already sold car', (done) => {
    const user = {
      email: 'ajani2@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v1/car/2')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
