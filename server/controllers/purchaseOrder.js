import pool from '../models/database';
import validateOrder from '../helpers/purchaseOrder';

const order = async (req, res) => {
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
      car_id: req.body.car_id,
      amount: req.body.amount,
      created_on: Date(),
    };

    const findCarId = 'SELECT * FROM cars WHERE id = $1';
    const carValue = req.body.car_id;
    const carId = await pool.query(findCarId, [carValue]);

    if (!carId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'car ordered not found',
      });
      return;
    }
    const findBuyerId = 'SELECT * FROM users WHERE id = $1';
    const value = req.payload.id;
    const buyerId = await pool.query(findBuyerId, [value]);

    if (!buyerId.rows[0]) {
      res.status(401).json({
        status: 401,
        error: 'buyer not found',
      });
      return;
    }
    if (buyerId.rows[0].id === carId.rows[0].owner) {
      res.status(400).json({
        status: 400,
        error: 'You cant place an order on your car ad',
      });
      return;
    }
    const insertOrder = 'INSERT INTO orders(buyer, car_id, owner, amount, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const results = await pool.query(insertOrder, [buyerId.rows[0].id, carId.rows[0].id,
      carId.rows[0].owner, latestOrder.amount, latestOrder.created_on]);

    res.status(201).json({
      status: 201,
      data: {
        id: results.rows[0].id,
        buyer: results.rows[0].buyer,
        created_on: results.rows[0].created_on,
        owner: results.rows[0].owner,
        car_id: results.rows[0].car_id,
        status: carId.rows[0].status,
        price: carId.rows[0].price,
        price_offered: results.rows[0].amount,
        product_image: carId.rows[0].product_image
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
export default order;
