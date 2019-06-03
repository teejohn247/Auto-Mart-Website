import express from 'express';
import auth from '../middleware/auth';
import markCarSold from '../controllers/markAd';

const router = express.Router();

router.patch('/:id', auth, markCarSold);

export default router;
