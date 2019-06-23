import express from 'express';
import imageUploader from '../middleware/imageUploader';
import upload from '../config/multer.config';
import ads from '../controllers/ads';
import markSold from '../controllers/markAd';
import deletePosted from '../controllers/adminDelete';
import auth from '../middleware/auth';
import admin from '../middleware/adminAuth';


const router = express.Router();


router.post('/', auth, upload.array('product_image', 6), imageUploader, ads);
router.patch('/:id', auth, markSold);
router.delete('/:id', [auth, admin], deletePosted);

export default router;
