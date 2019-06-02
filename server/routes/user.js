
import express from 'express';
import signin from '../controllers/signin';

const router = express.Router();

router.post('/signin', signin);

export default router;
