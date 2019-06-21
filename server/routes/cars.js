import express from 'express';
import imageUploader from '../middleware/imageUploader';
import upload from '../config/multer.config';
import ads from '../controllers/ads';
import markSold from '../controllers/markAd';
import deletePosted from '../controllers/adminDelete';
import auth from '../middleware/auth';


const router = express.Router();


router.post('/', auth, upload.single('product_image'), imageUploader, ads);
router.patch('/:id', auth, markSold);
router.delete('/:id', deletePosted);

export default router;
