import pg from 'pg';

const config = {
  user: 'dimwftyqzgbuei',
  host: 'ec2-23-21-186-85.compute-1.amazonaws.com',
  database: 'd2hhl5sns3n4f5',
  password: '9d92768d7e99edf0cc50c55356b56272bd6ed62bc2ba78a69d319f3bba74d7eb',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the Database');
});


module.exports = pool;
