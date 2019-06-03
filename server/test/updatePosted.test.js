import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('updating the price posted car ad', () => {
  it('should return a 200 if the price is been updated', (done) => {
    const seller = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(seller, 'SECRET_KEY', { expiresIn: '24hrs' });
    const latestOrder = {
      price: 20000,
    };
    chai.request(app)
      .patch('/api/v1/cars/1')
      .set('Authorization', token)
      .send(latestOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 401 if seller is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/cars/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 404 if car id is not found', (done) => {
    const seller = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(seller, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      price: 20000,
    };
    chai.request(app)
      .patch('/api/v1/cars/20')
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
});
