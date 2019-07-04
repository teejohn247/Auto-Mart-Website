import express from 'express';
import auth from '../middleware/auth';
import allOrders from '../controllers/allOrders';

const router = express.Router();

router.get('/:id', auth, allOrders);

export default router;
