/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import users from '../models/users';
import validateUserSignup from '../helpers/users';

const signup = (req, res) => {
  const user = users.find(e => e.email === req.body.email);
  if (user) return res.status(405).json({ status: 405, error: 'The email is already registered' });

  const { error } = validateUserSignup.validation(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }

  const id = parseInt(users.length + 1, 10);
  const newUser = {
    id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
  };
  const token = jwt.sign(newUser, 'SECRET_KEY', { expiresIn: '24hrs' });
  const firstName = newUser.firstName;

  users.push(newUser);

  res.status(201).json({
    status: 201,
    message: `Welcome back, ${firstName}!`,
    data: {
      token,
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  });

  return false;
};

export default signup;
