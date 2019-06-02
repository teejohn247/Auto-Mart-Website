import jwt from 'jsonwebtoken';

const errorMessage = (res, message) => {
  res.status(401).json({
      status: 'error',
      message
  });
};

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
    return errorMessage(res, 401, 'Authorization token was not provided');
    }
    const token = jwt.verify(header, 'SECRET_KEY');
    req.user = token;
    next();
  } catch (err) {
    return errorMessage(res, 401, 'Invalid authorization token');
  }
  return false;
};

export default auth;
