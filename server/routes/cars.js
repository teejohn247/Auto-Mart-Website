import express from 'express';
import ads from '../controllers/ads';
import markSold from '../controllers/markAd';
import deletePosted from '../controllers/adminDelete';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, ads);
router.patch('/:id', auth, markSold);
router.delete('/:id', deletePosted);

export default router;
