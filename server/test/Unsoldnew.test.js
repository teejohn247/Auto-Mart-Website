import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('View new unsold cars', () => {
  it('should return a status of 200 if users can view new unsold cars', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v1/cars/available/new')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});
