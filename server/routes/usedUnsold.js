import express from 'express';
import auth from '../middleware/auth';
import getUsedUnsoldCars from '../controllers/usedUnsold';

const router = express.Router();

router.get('/available/used', auth, getUsedUnsoldCars);

export default router;
