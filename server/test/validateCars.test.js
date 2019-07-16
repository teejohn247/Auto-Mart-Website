import { describe, it, expect } from 'mocha';
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

describe('Post a car sale ad', () => {
  it('user should be able to post a car sale ad', (done) => {
    chai.request(app)
    .post('/api/v1/car')
    .type('form')
    .set('Authorization', myToken)
    .set('Content-Type', 'multipart/form-data')
    .attach('product_image', './test/bb.jpg')
    .field('state', 'Used')
    .field('status', 'available')
    .field('price', 300000)
    .field('manufacturer', 'toyota')
    .field('model', 'corolla')
    .field('body_type', 'sedan')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return 401 if user is not authorized', (done) => {
    chai.request(app)
    .post('/api/v1/car')
    .type('form')
    .set('Content-Type', 'multipart/form-data')
    .attach('product_image', './test/bb.jpg')
    .field('state', 'Used')
    .field('status', 'available')
    .field('price', 300000)
    .field('manufacturer', 'toyota')
    .field('model', '')
    .field('body_type', 'sedan')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return 400 if model is not specified', (done) => {
    chai.request(app)
    .post('/api/v1/car')
    .type('form')
    .set('Authorization', myToken)
    .set('Content-Type', 'multipart/form-data')
    .attach('product_image', './test/bb.jpg')
    .field('state', 'Used')
    .field('status', 'available')
    .field('price', 300000)
    .field('manufacturer', 'toyota')
    .field('model', '')
    .field('body_type', 'sedan')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a 400 if there is a missing info', (done) => {
    chai.request(app)
    .post('/api/v1/car')
    .type('form')
    .set('Authorization', myToken)
    .set('Content-Type', 'multipart/form-data')
    .attach('product_image', './test/bb.jpg')
    .field('state', 'Used')
    .field('status', 'available')
    .field('price', 300000)
    .field('manufacturer', 'toyota')
    .field('body_type', 'sedan')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should filter the list of unsold car ads based on a price range', (done) => {
chai.request(app)
.get('/api/v1/car?status=Available&min_price=10000&max_price=18000000')
.set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data[0]).to.include({ status: 'Available' });
expect(parseFloat(data[0].price)).to.be.above(parseFloat(2000000));
expect(parseFloat(data[0].price)).to.be.below(parseFloat(18000000));
expect(data.length).to.equal(4);
});
done();
});

it('should filter the list of unsold car ads based on the manufacturer', (done) => {
chai.request(app)
.get('/api/v1/car?status=Available&manufacturer=Toyota')
.set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data.length).to.equal(3);
expect(data[0].manufacturer).to.equal('Toyota');
});
done();
});
it('should filter the list of unsold car ads based on the body type', (done) => {
 chai.request(app)
.get('/api/v1/car?status=available&body_type=fgh')
    .set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data.length).to.equal(3);
expect(data[0].body_type).to.equal('fgh');
});
done();
});

it('should filter the list of all car ads based on the body type', (done) => {
chai.request(app)
   .get('/api/v1/car?body_type=fgh')
   .set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data.length).to.equal(3);
expect(data[0].body_type).to.equal('fgh');
});
done();
});
it('should return all new unsold car ads', (done) => {
chai.request(app)
    .get('/api/v1/car?status=available&state=new')
    .set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data.length).to.equal(2);
expect(data[0].state).to.equal('new');
});
done();
});
it('should return all used unsold car ads', (done) => {
chai.request(app)
    .get('/api/v1/car?status=available&state=used')
    .set('Authorization', myToken)
.end((err, res) => {
const { data } = res.body;
res.should.have.status(200);
expect(data.length).to.equal(3);
expect(data[0].state).to.equal('used');
});
done();
});
});
