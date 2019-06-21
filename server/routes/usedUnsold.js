import express from 'express';
import auth from '../middleware/auth';
import getUsedUnsoldCars from '../controllers/usedUnsold';

const router = express.Router();

router.get('/car', auth, getUsedUnsoldCars);

export default router;
