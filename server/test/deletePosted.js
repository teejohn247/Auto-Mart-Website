import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Delete a posted car ad', () => {
  it('should return a 200 if user can delete a posted ad', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .delete('/api/v1/car/3')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a status code of 404 if post is not found', (done) => {
    const buyer = {
      email: 'brown@gmail.com',
    };
    const token = jwt.sign(buyer, 'SECRET_KEY', { expiresIn: '24hrs' });
    chai.request(app)
      .delete('/api/v1/car/9')
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
