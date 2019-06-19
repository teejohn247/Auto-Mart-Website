import pool from '../models/database';

const getNewUnsoldCars = async (req, res) => {
  try {
    const findNewUnsoldCars = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
    const values = [req.query.status, req.query.state];
    const newUnsoldCars = await pool.query(findNewUnsoldCars, values);

    if (!newUnsoldCars.rows[0]) {
      res.status(404).json({
        status: 404,
        message: `no ${req.query.status} found`,
        data: [],
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: newUnsoldCars.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};

export default getNewUnsoldCars;
