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
            email: 'teejohn247@gmail.com',
            password: 'wisdom123'
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

describe('updating the price posted car ad', () => {
  it('should return a 200 if the price is been updated', (done) => {
    const latestOrder = {
      price: 20000,
    };
    chai.request(app)
      .patch('/api/v1/cars/14')
      .set('Authorization', myToken)
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
      .patch('/api/v1/cars/15')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
});
