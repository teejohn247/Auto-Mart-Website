import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Viewing a specific car', () => {
  it('user should be able to view a specific car', (done) => {
    const buyer = {
      email: 'ajani2@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v1/car/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to view a specific car when he is not authorized', (done) => {
    chai.request(app)
      .get('/api/v1/car/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to view a specific car when the car is not in the system', (done) => {
    const buyer = {
      email: 'ajani2@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v1/car/19')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});
