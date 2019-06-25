import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || header === '') return res.status(401).json({ status: 401, error: 'Unauthorized' });

    const token = jwt.verify(header, 'process.env.SECRET_KEY');
    req.user = token;
    req.user.is_admin = token.is_admin;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, error: 'Invalid token!' });
  }
  return false;
};


export default auth;
