import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432

};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the Database');
});

export default pool;
