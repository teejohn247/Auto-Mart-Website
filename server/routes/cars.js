import express from 'express';
import multer from 'multer';
import imageUploader from '../middleware/imageUploader';
import ads from '../controllers/ads';
import markSold from '../controllers/markAd';
import deletePosted from '../controllers/adminDelete';
import auth from '../middleware/auth';


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
     cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter
});

router.post('/', auth, upload.array('productImage', 6), imageUploader, ads);
router.patch('/:id', auth, markSold);
router.delete('/:id', deletePosted);

export default router;
