import pool from '../models/database';

const allposted = async (req, res) => {
  try {
    const findCars = 'SELECT * FROM cars';
    const cars = await pool.query(findCars);
    if (!req.user.is_admin) {
      res.status(401).json({
         status: 401,
         error: 'You are not authorized to perform this action',
       });
     }
    if (!cars.rows[0]) {
      res.status(404).json({
        status: 404,
        message: 'no car found',
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      data: cars.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};
export default allposted;
