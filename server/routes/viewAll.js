import express from 'express';
import auth from '../middleware/auth';
import allposted from '../controllers/viewAll';

const router = express.Router();

router.get('/allposted', auth, allposted);

export default router;
