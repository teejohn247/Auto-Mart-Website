import express from 'express';
import auth from '../middleware/auth';
import bodyType from '../controllers/viewBodyType';

const router = express.Router();

router.get('/', auth, bodyType);

export default router;
