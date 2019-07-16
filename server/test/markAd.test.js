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

describe('Marking the posted car ad as sold', () => {
  it('should return a 200 if car is successfully marked as sold', (done) => {
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v1/car/28')
      .set('Authorization', myToken)
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
      .patch('/api/v1/car/11')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a 404 if car is not found in the database', (done) => {
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v1/car/1000')
      .set('Authorization', myToken)
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
    chai.request(app)
      .patch('/api/v1/car/11')
      .set('Authorization', myToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if there is a wrong input data', (done) => {
    const status = {
      status: 8,
    };
    chai.request(app)
      .patch('/api/v1/car/11')
      .set('Authorization', myToken)
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
