import validateUpdateStatus from '../helpers/markAd';
import ads from '../models/postCars';

const markadsold = (req, res) => {
  const { error } = validateUpdateStatus.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const carMarkId = req.params.id;
  const carMarkIndex = ads.findIndex(o => o.id === parseInt(carMarkId, 10));
  if (carMarkIndex > -1) {
    const originalCar = ads[carMarkIndex];
    if (originalCar.status !== 'available') {
      res.status(400).json({
        status: 400,
        error: 'you can not change the status of this car',
      });
      return;
    }
    const newCarStatus = {
      id: originalCar.id,
      email: originalCar.email,
      createdOn: Date(),
      manufacturer: originalCar.manufacturer,
      model: originalCar.model,
      price: originalCar.price,
      state: originalCar.state,
      status: req.body.status,
    };

    ads[carMarkIndex] = {
      id: originalCar.id,
      owner: originalCar.owner,
      createdOn: newCarStatus.createdOn,
      manufacturer: originalCar.manufacturer,
      model: originalCar.model,
      price: originalCar.price,
      state: originalCar.state,
      status: newCarStatus.status,
    };

    res.status(200).json({
      status: 200,
      data: newCarStatus,
    });
    return;
  }
  res.status(404).json({
    status: 404,
    error: 'car post not found',
  });
};

export default markadsold;
