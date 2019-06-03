import validatePostedPrice from '../helpers/updatePosted';
import cars from '../models/postCars';

const price = (req, res) => {
  const { error } = validatePostedPrice.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const carId = req.params.id;
  const updatePriceIndex = cars.findIndex(p => p.id === parseInt(carId, 10));
  if (updatePriceIndex > -1) {
    const dbData = cars[updatePriceIndex];
    const updatedPrice = {
      id: dbData.id,
      owner: dbData.owner,
      createdOn: Date(),
      state: dbData.state,
      status: dbData.status,
      price: req.body.price,
      manufacturer: dbData.manufacturer,
      model: dbData.model,
      body_type: dbData.body_type,
    };
    cars[updatePriceIndex] = {
      id: dbData.id,
      owner: dbData.owner,
      createdOn: updatedPrice.createdOn,
      state: dbData.state,
      status: dbData.status,
      price: updatedPrice.price,
      manufacturer: dbData.manufacturer,
      model: dbData.model,
      body_type: dbData.body_type,
    };
    res.status(200).json({
      status: 200,
      data: updatedPrice,
    });
    return;
  }
  res.status(404).json({
    status: 404,
    error: 'car post not found',
  });
};
export default price;
