import validatePricePrice from '../helpers/updatePrice';
import pool from '../models/database';


const updatePrice = async (req, res) => {
  try {
    const { error } = validatePricePrice.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }


    const findOrderId = 'SELECT * FROM orders WHERE car_id = $1';
    const value = parseInt(req.params.id, 10);
    const OrderId = await pool.query(findOrderId, [value]);
    if (!OrderId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'order not found',
      });
      return;
    }

    const newPrice = 'UPDATE orders SET amount = $1 WHERE car_id = $2';
    const values = [req.body.price_offered, value];
    await pool.query(newPrice, values);


    const EditedOrder = {
      id: OrderId.rows[0].id,
      card_id: OrderId.rows[0].card_id,
      status: OrderId.rows[0].status,
      old_price_offered: OrderId.rows[0].amount,
      new_price_offered: req.body.price_offered,
    };

    res.status(200).json({
      status: 200,
      data: EditedOrder,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};

export default updatePrice;
