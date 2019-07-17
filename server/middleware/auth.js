import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token|| token === '') return res.status(401).json({ status: 401, error: 'Unauthorized' });

    const options = { expiresIn: '1d' };

    req.payload = jwt.verify(token, process.env.SECRET_KEY, options);
    next();
      } catch (error) {
        return res.status(401).json({ status: 401, error: 'Invalid token!' });
      }

  return false;
};

export default auth;
