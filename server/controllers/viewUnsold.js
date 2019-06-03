import cars from '../models/postCars';

const getUnsoldCars = (req, res) => {
  const unsoldCars = cars.filter(car => car.status === 'available');
  res.status(200).json({
    status: 200,
    data: unsoldCars,
  });
};
export default getUnsoldCars;
