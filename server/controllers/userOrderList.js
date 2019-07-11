import pool from '../models/database';

const userOrdersList = async (req, res) => {
  try {
    const userOrder = 'SELECT * FROM orders WHERE buyer = $1';
    const value = req.payload.id;
    const userOrders = await pool.query(userOrder, [value]);
    if (!userOrders.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'orders not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: userOrders.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};
export default userOrdersList;
