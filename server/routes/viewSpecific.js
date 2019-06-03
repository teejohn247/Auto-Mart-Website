import express from 'express';
import auth from '../middleware/auth';
import getCar from '../controllers/viewSpecific';

const router = express.Router();


router.get('/:id', auth, getCar);

export default router;
