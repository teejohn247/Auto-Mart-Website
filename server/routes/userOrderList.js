import express from 'express';
import auth from '../middleware/auth';
import getNewUnsoldAds from '../controllers/userOrderList';

const router = express.Router();

router.get('/user/orders', auth, getNewUnsoldAds);

export default router;
