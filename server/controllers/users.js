import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/database';
import validateUserSignup from '../helpers/users';
import '@babel/polyfill';


const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    users_id: req.body.users_id,
    first_name: req.body.first_name.trim(),
    last_name: req.body.last_name.trim(),
    email: req.body.email.toLowerCase().trim(),
    password: hash,
    address: req.body.address.trim(),
    is_admin: req.body.is_admin
  };

  const { error } = validateUserSignup.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

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
const insertUser = await pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *',
[newUser.users_id,
  newUser.first_name,
  newUser.last_name,
  newUser.email,
  newUser.password,
  newUser.address,
  newUser.is_admin]);

  const payload = {
    email: insertUser.rows[0].email
  };

  const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });

  res.status(201).json({
    status: 201,
    data: {
      token,
      id: insertUser.rows[0].users_id,
      first_name: insertUser.rows[0].first_name,
      last_name: insertUser.rows[0].last_name,
      email: insertUser.rows[0].email,
    }
  });
} catch (error) {
  res.status(500).json({
    status: 500,
    message: 'Server error',
  });
}
};

export default signup;
