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

describe('Viewing a specific car', () => {
  it('user should be able to view a specific car', (done) => {
    chai.request(app)
      .get('/api/v1/car/18')
      .set('Authorization', myToken)
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
      .get('/api/v1/car/16')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        done();
      });
  });

  it('user should not be able to view a specific car when the car is not in the system', (done) => {
    chai.request(app)
      .get('/api/v1/car/100')
      .set('Authorization', myToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});
