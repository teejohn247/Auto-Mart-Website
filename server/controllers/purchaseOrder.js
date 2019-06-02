import order from '../models/purchaseOrder';
import users from '../models/users';
import cars from '../models/postCars';
import validateOrder from '../helpers/purchaseOrder';

const Order = (req, res) => {
  const { error } = validateOrder.validation(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }

  const newOrder = {
    id: parseInt(order.length + 1, 10),
    buyer: req.body.buyer,
    car_id: req.body.car_id,
    amount: req.body.amount,
    status: req.body.status || 'pending',
  };
  const userId = users.find(b => b.id === parseInt(newOrder.buyer, 10));
  if (!userId) {
    return res.status(404).json({
      status: 404,
      error: 'buyer id not found',
    });
  }

  const carId = cars.find(c => c.id === parseInt(newOrder.car_id, 10));
  if (!carId) {
    return res.status(404).json({
      status: 404,
      error: 'car ordered not found',
    });
  }
   const latestOrder = {
      car_id: newOrder.car_id,
      created_on: Date(),
      status: newOrder.status,
      price: carId.price,
      price_offered: newOrder.amount
  };

  order.push(newOrder);
  return res.status(201).json({
    status: 201,
    data: latestOrder
  });
};

export default Order;
