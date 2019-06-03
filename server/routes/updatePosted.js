import express from 'express';
import auth from '../middleware/auth';
import price from '../controllers/updatePosted';

const router = express.Router();

router.patch('/:id', auth, price);

export default router;
