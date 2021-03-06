import express from 'express';
import auth from '../middleware/auth';
import getAds from '../controllers/getAds';

const router = express.Router();

router.get('/view', auth, getAds);

export default router;
