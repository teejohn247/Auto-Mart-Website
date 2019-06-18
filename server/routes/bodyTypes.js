import express from 'express';
import auth from '../middleware/auth';
import bodyType from '../controllers/viewBodyType';

const router = express.Router();

router.get('/bodytype', auth, bodyType);

export default router;
