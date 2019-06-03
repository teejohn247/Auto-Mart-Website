import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('updating the price purchasing order', () => {
  it('should return a 200 for a successful update', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 20000,
    };
    chai.request(app)
      .patch('/api/v1/order/1')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 401 if buyer is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/order/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return 404 if first order is not in the database', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const latestOrder = {
      price_offered: 20000,
    };
    chai.request(app)
      .patch('/api/v1/order/100')
      .set('Authorization', token)
      .send(latestOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if input field data type is wrong', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 'bn',
    };
    chai.request(app)
      .patch('/api/v1/order/1')
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
