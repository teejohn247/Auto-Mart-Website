import express from 'express';
import auth from '../middleware/auth';
import getCars from '../controllers/viewUnsold';

const router = express.Router();

router.get('/available', auth, getCars);

export default router;
