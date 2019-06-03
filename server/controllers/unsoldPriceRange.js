/* eslint-disable max-len */
import cars from '../models/postCars';
import validateRange from '../helpers/range';

const UnsoldCarsWithinPriceRange = (req, res) => {
  const { error } = validateRange.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const Price = {
    min_price: req.body.min_price,
    max_price: req.body.max_price,
  };
  const unsoldCars = cars.filter(car => car.status === 'available');
  const PriceRange = unsoldCars.filter(p => p.price >= Price.min_price && p.price <= Price.max_price);
  if (!PriceRange.length) {
    res.status(404).json({
      status: 404,
      error: 'there are no cars within that price range not found',
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: PriceRange,
  });
};
export default UnsoldCarsWithinPriceRange;
