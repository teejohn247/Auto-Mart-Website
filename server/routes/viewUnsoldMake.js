import express from 'express';
import auth from '../middleware/auth';
import getCar from '../controllers/unsoldMake';

const router = express.Router();


router.get('/car', auth, getCar);

export default router;
