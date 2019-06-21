import express from 'express';
import UnsoldCarsWithinPriceRange from '../controllers/unsoldPriceRange';

const router = express.Router();

// get cars within price range
router.get('/', UnsoldCarsWithinPriceRange);

export default router;
