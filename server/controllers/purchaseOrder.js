import pool from '../models/database';
import validateOrder from '../helpers/purchaseOrder';

const Order = async (req, res) => {
  try {
    const { error } = validateOrder.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

    const latestOrder = {
      buyer: req.body.buyer,
      car_id: req.body.car_id,
      amount: req.body.amount,
    };

    const findBuyerId = 'SELECT * FROM users WHERE users_id = $1';
    const value = latestOrder.buyer;
    const buyerId = await pool.query(findBuyerId, [value]);

    if (!buyerId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'buyer id not found',
      });
      return;
    }

    const findCarId = 'SELECT * FROM cars WHERE owner = $1';
    const carValue = latestOrder.car_id;
    const carId = await pool.query(findCarId, [carValue]);

    if (!carId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'car ordered not found',
      });
      return;
    }
    const insertOrder = 'INSERT INTO orders(buyer, car_id, amount, status) VALUES($1, $2, $3, $4) RETURNING *';
    const results = await pool.query(insertOrder,
      [
        latestOrder.buyer,
        latestOrder.car_id,
        latestOrder.amount,
        carId.rows[0].status,
      ]);

    res.status(201).json({
      status: 201,
      data: {
        car_id: results.rows[0].car_id,
        status: carId.rows[0].status,
        price: carId.rows[0].price,
        price_offered: results.rows[0].amount,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};

export default Order;
