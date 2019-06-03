/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import users from '../models/users';
import validateUserSignin from '../helpers/signin';

const signin = (req, res) => {
  const userSchema = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = validateUserSignin.validation(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }

  const user = users.find(e => e.email === userSchema.email);
  if (!user) {
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  const password = users.find(p => p.password === req.body.password);
  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'Incorrect password',
    });
  }

  const token = jwt.sign(user, 'SECRET_KEY', { expiresIn: '24hrs' });
  const firstName = user.firstName;

  return res.status(200).json({
    status: 200,
    message: `Welcome back, ${firstName}!`,
    data: {
      token,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};

export default signin;
