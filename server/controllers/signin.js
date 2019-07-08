/* eslint-disable prefer-destructuring */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import utils from '../config/utils';
import pool from '../models/database';
import validateUserSignin from '../helpers/signin';

dotenv.config();

const signin = async (req, res) => {
  try {
    const { error } = validateUserSignin.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

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
    data: {
      token,
      id: user.rows[0].id,
      firstName: user.rows[0].first_name,
      lastName: user.rows[0].last_name,
      email: user.rows[0].email
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
