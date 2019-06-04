import express from 'express';
import auth from '../middleware/auth';
import getNewUnsoldAds from '../controllers/newUnsold';

const router = express.Router();

router.get('/available/new', auth, getNewUnsoldAds);

export default router;
