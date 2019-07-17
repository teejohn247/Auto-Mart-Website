import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import utils from '../config/utils';
import pool from '../models/database';
import '@babel/polyfill';

dotenv.config();

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
    first_name: req.body.first_name.trim(),
    last_name: req.body.last_name.trim(),
    email: req.body.email.toLowerCase().trim(),
    password: hash,
    address: req.body.address.trim(),
    is_admin: req.body.is_admin
  };

  const findUser = 'SELECT * FROM users WHERE email = $1';
    const values = newUser.email;
    const user = await pool.query(findUser, [values]);

    if (user.rows[0]) {
      res.status(403).json({
        status: 403,
        error: 'Sorry the email you have entered already exists in the system, try another one!',
      });
      return;
    }
const insertUser = await pool.query('INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *',
[newUser.email, newUser.first_name, newUser.last_name, newUser.password,
 newUser.address, newUser.is_admin]);

const token = utils.encodeToken(insertUser.rows[0].email, insertUser.rows[0].id,
   insertUser.rows[0].is_admin);


  res.status(201).json({
    status: 201,
    token,
    data: {
      token,
      id: insertUser.rows[0].id,
      first_name: insertUser.rows[0].first_name,
      last_name: insertUser.rows[0].last_name,
      email: insertUser.rows[0].email,
      address: insertUser.rows[0].address,
      is_admin: insertUser.rows[0].is_admin,
    }
  });
} catch (error) {
  res.status(500).json({
    status: 500,
    error: 'Server error',
  });
}
};

export default signup;
