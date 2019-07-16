import express from 'express';
import auth from '../middleware/auth';
import getNewUnsoldAds from '../controllers/userAdsList';

const router = express.Router();

router.get('/user/ads', auth, getNewUnsoldAds);


export default router;
