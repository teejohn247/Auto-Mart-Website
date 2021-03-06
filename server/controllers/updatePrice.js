import pool from '../models/database';


const updatePrice = async (req, res) => {
  try {
    const findOrderId = 'SELECT * FROM orders WHERE id = $1';
    const value = parseInt(req.params.id, 10);
    const OrderId = await pool.query(findOrderId, [value]);
    if (!OrderId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'order not found',
      });
      return;
    }
    if (req.payload.id !== OrderId.rows[0].buyer) {
      res.status(401).json({
        status: 401,
        error: 'order: you are not authorized to view this content',
      });
      return;
    }


    const newPrice = 'UPDATE orders SET amount = $1 WHERE id = $2';
    const values = [req.body.price_offered, value];
    await pool.query(newPrice, values);


    const EditedOrder = {
      id: OrderId.rows[0].id,
      status: OrderId.rows[0].status,
      car_id: OrderId.rows[0].car_id,
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
