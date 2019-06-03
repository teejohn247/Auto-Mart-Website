import validatePricePrice from '../helpers/updatePrice';
import order from '../models/order';

const price = (req, res) => {
  const { error } = validatePricePrice.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const orderId = req.params.id;
  const orderIndex = order.findIndex(o => o.id === parseInt(orderId, 10));
  if (orderIndex > -1) {
    const firstOrder = order[orderIndex];
    if (firstOrder.status !== 'pending') {
      res.status(400).json({
        status: 400,
        error: 'you can change the price of pending purchasing orders only',
      });
      return;
    }
    const EditedOrder = {
      id: firstOrder.id,
      card_id: firstOrder.card_id,
      created_on: Date(),
      status: firstOrder.status,
      old_price_offered: firstOrder.price_offered,
      new_price_offered: req.body.price_offered,
    };
    order[orderIndex] = {
      id: firstOrder.id,
      car_id: firstOrder.car_id,
      created_on: EditedOrder.created_on,
      status: firstOrder.status,
      price: firstOrder.price,
      price_offered: EditedOrder.new_price_offered,
    };
    res.status(200).json({
      status: 200,
      data: EditedOrder,
    });
    return;
  }
  res.status(404).json({
    status: 404,
    error: 'order not found',
  });
};

export default price;
