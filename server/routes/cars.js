import express from 'express';
import markSold from '../controllers/markAd';
import ads from '../controllers/ads';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, ads);

export default router;
