import { describe, it, } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('signin', () => {
  it('user should be able to signin', (done) => {
    const user = {
      email: 'ben@gmail.com',
      password: 'wisdom123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to signin when there is incorrect data type', (done) => {
    const user = {
      email: 1213,
      password: 'wisdom123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signin when the email is not registered', (done) => {
    const user = {
      email: 'new@gmail.com',
      password: 'wisdom123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signin when there is an empty field', (done) => {
    const user = {
      email: 'ben@gmail.com',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to signin when the password length is less than 6', (done) => {
    const user = {
      email: 'ben@gmail.com',
      password: 'wisdo',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });


  it('user should not be able to signin when the password is incorrect', (done) => {
    const user = {
      email: 'ben@gmail.com',
      password: 'wisdom1234',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('signup', () => {
  it('user should be able to signup', (done) => {
    const user = {
      email: 'brendan@gmail.com',
      firstName: 'Brendan',
      lastName: 'Rodgers',
      password: 'wisdom123',
      address: 'Iowa',
      isAdmin: 'False',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to signup when there is incorrect data type', (done) => {
    const user = {
       email: 'brend@gmail.com',
      firstName: 131,
      lastName: 'Rodgers',
      password: 'wisdom123',
      address: 'Iowa',
      isAdmin: 'False',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when the email is already registered', (done) => {
    const user = {
      email: 'ben@gmail.com',
      firstName: 'Ben',
      lastName: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      isAdmin: 'false',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(405);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(405);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when email is not entered', (done) => {
    const user = {
      firstName: 'Ben',
      lastName: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      isAdmin: 'false',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to signup when there is an empty field', (done) => {
    const user = {
      email: '',
      firstName: 'Ben',
      lastName: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      isAdmin: 'false',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
