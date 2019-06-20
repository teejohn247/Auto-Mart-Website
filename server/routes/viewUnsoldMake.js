import express from 'express';
import auth from '../middleware/auth';
import getCar from '../controllers/unsoldMake';

const router = express.Router();


router.get('/manufacture', auth, getCar);

export default router;
