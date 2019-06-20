import { describe, it, } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('signin', () => {
  it('user should be able to signin', (done) => {
    const user = {
      email: 'ajani2@gmail.com',
      password: 'eeeeee',
    };
    chai.request(app)
      .post('/api/v1/signin')
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
      password: 'eeeeee',
    };
    chai.request(app)
      .post('/api/v1/signin')
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
      password: 'eeeeee',
    };
    chai.request(app)
      .post('/api/v1/signin')
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
      email: 'ajani2@gmail.com',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/signin')
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
      .post('/api/v1/signin')
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
      email: 'ajani2@gmail.com',
      password: 'wisdom1',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('signup', () => {
  it('user should be able to signup', (done) => {
    const user = {
      email: 'brendan1@gmail.com',
      first_name: 'Brendan',
      last_name: 'Rodgers',
      password: 'wisdom123',
      address: 'Iowa',
      is_admin: 'False',
    };
    chai.request(app)
      .post('/api/v1/signup')
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
       email: 'brendan1@gmail.com',
      first_name: 131,
      last_name: 'Rodgers',
      password: 'wisdom123',
      address: 'Iowa',
      is_admin: 'False',
    };
    chai.request(app)
      .post('/api/v1/signup')
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
      email: 'brendan@gmail.com',
      first_name: 'Ben',
      last_name: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      is_admin: 'False',
    };
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when email is not entered', (done) => {
    const user = {
      email: '',
      first_name: 'Ben',
      last_name: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      is_admin: 'False'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
      first_name: 'Ben',
      last_name: 'graham',
      password: 'wisdom123',
      address: 'Washignton DC',
      is_admin: 'False'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
