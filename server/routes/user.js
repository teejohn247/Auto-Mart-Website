import express from 'express';
import createUser from '../controllers/users';
import signin from '../controllers/signin';

const router = express.Router();
router.post('/signup', createUser);
router.post('/signin', signin);

export default router;
