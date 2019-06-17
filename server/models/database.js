import pg from 'pg';

const config = {
  user: 'AutoMartdb',
  host: 'localhost',
  database: 'AutoMartdb',
  password: 'wisdom123',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the Database');
});


module.exports = pool;
