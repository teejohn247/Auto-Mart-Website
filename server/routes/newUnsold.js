import express from 'express';
import auth from '../middleware/auth';
import newUnsoldCars from '../controllers/newUnsold';

const router = express.Router();

router.get('/available/new', auth, newUnsoldCars);

export default router;
