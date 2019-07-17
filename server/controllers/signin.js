/* eslint-disable prefer-destructuring */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import utils from '../config/utils';
import pool from '../models/database';

dotenv.config();

const signin = async (req, res) => {
  try {
 const findUser = 'SELECT * FROM users WHERE email = $1';
 const values = req.body.email.trim().toLowerCase();
 const user = await pool.query(findUser, [values]);

 if (!user.rows[0]) {
   res.status(404).json({
     status: 404,
     error: 'Incorrect email or password',
   });
   return;
 }

const password = await bcrypt.compare(req.body.password, user.rows[0].password);

if (!password) {
  res.status(404).json({
    status: 404,
    error: 'Incorrect email or password',
  });
  return;
}

  const token = utils.encodeToken(user.rows[0].id, user.rows[0].email, user.rows[0].is_admin);

   res.status(200).json({
    status: 200,
    token,
    data: {
      token,
      id: user.rows[0].id,
      first_name: user.rows[0].first_name,
      last_name: user.rows[0].last_name,
      password: user.rows[0].password,
      address: user.rows[0].address,
      email: user.rows[0].email,
      is_admin: user.rows[0].is_admin
    }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default signin;
