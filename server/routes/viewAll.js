import express from 'express';
import auth from '../middleware/auth';
import allposted from '../controllers/viewAll';
import admin from '../middleware/adminAuth';


const router = express.Router();

router.get('/allposted', [auth, admin], allposted);

export default router;
