import express from 'express';
import ads from '../controllers/ads';
import auth from '../middleware/auth';

const router = express.Router();

// car sale ads
router.post('/', auth, ads);

export default router;
