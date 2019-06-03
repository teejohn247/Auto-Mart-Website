import express from 'express';
import auth from '../middleware/auth';
import order from '../controllers/purchaseOrder';

const router = express.Router();

router.post('/', auth, order);
export default router;
