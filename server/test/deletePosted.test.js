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

describe('Delete a posted car ad', () => {
  it('should return a 200 if user can delete a posted ad', (done) => {
    chai.request(app)
      .delete('/api/v1/car/24')
      .set('Authorization', myToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a status code of 404 if post is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/car/111')
      .set('Authorization', myToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});
