import express from 'express';
import auth from '../middleware/auth';
import deletePosted from '../controllers/adminDelete';

const router = express.Router();

router.delete('/:id', auth, deletePosted);
export default router;
