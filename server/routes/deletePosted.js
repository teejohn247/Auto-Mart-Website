import express from 'express';
import deletePosted from '../controllers/adminDelete';

const router = express.Router();

router.delete('/:id', deletePosted);
export default router;
