import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();
let myToken;

before((done) => {
    chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'adeline@gmail.com',
            password: 'wisdom123'
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

describe('Purchasing order', () => {
  it('should return a 200 if buyer is able to make a purchase order', (done) => {
    const newOrder = {
      car_id: 11,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 404 if car id is not found', (done) => {
    const newOrder = {
      car_id: 1000,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
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
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if buyer input a wrong datatype', (done) => {
    const newOrder = {
      buyer: 1,
      car_id: 10,
      amount: 'two',
    };
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', myToken)
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
