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

describe('updating the price purchasing order', () => {
  it('should return a 200 for a successful update', (done) => {
    const newOrder = {
      price_offered: 20000,
    };
    chai.request(app)
      .patch('/api/v1/order/5')
      .set('Authorization', myToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return a 400 if input field data type is wrong', (done) => {
    const newOrder = {
      price_offered: 'bn',
    };
    chai.request(app)
      .patch('/api/v1/order/5')
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
