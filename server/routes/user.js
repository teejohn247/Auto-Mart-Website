import express from 'express';
import signup from '../controllers/users';
import signin from '../controllers/signin';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
