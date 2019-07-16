import express from 'express';
import auth from '../middleware/auth';
import getOrder from '../controllers/viewOrder';

const router = express.Router();


router.get('/:id', auth, getOrder);

export default router;
