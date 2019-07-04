import pool from '../models/database';


const getAds = async (req, res) => {
  try {
    const findOrderId = 'SELECT * FROM cars WHERE owner = $1';
    const value = parseInt(req.params.id, 10);
    const OrderId = await pool.query(findOrderId, [value]);
    if (!OrderId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'Ad not found',
      });
      return;
    }


    res.status(200).json({
        status: 200,
        data: OrderId.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
};

export default getAds;
