import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('View all unsold cars within a price range', () => {
  it('should return a status code of 200 if users can view unsold cars within a price range', (done) => {
    const buyer = {
      email: 'ajani2@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    const price = {
      min_price: 1000,
      max_price: 2000,
    };
    chai.request(app)
      .get('/api/v1/cars/available/range')
      .set('Authorization', token)
      .send(price)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 404 if there is no car within a price range', (done) => {
    const price = {
      min_price: 90000,
      max_price: 100000,
    };
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v1/cars/available/range')
      .set('Authorization', token)
      .send(price)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});
