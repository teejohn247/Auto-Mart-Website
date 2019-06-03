import express from 'express';
import ads from '../controllers/ads';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, ads);
router.patch('/:id', auth, markSold);

export default router;
