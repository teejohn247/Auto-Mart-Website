import express from 'express';
import auth from '../middleware/auth';
import order from '../controllers/purchaseOrder';
import getNewUnsoldAds from '../controllers/userOrderList';


const router = express.Router();

router.post('/', auth, order);
router.get('/', auth, getNewUnsoldAds);

export default router;
