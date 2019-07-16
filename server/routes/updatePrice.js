import express from 'express';
import auth from '../middleware/auth';
import updatePrice from '../controllers/updatePrice';

const router = express.Router();

router.patch('/:id/price', auth, updatePrice);

export default router;
