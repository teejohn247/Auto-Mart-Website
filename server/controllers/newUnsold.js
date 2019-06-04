import cars from '../models/postCars';

const getNewUnsoldAds = (req, res) => {
  const newUnsoldAds = cars.filter(c => c.status === 'available' && c.state === 'new');
  res.status(200).json({
    status: 200,
    data: newUnsoldAds,
  });
};

export default getNewUnsoldAds;
