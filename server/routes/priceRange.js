import express from 'express';
import UnsoldCarsWithinPriceRange from '../controllers/unsoldPriceRange';

const router = express.Router();

// get cars within price range
router.get('/available/range', UnsoldCarsWithinPriceRange);

export default router;
