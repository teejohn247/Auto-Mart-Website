import pool from '../models/database';
import validatingStatus from '../helpers/viewAvailable';

const getUnsoldCars = async (req, res) => {
    try {
      const { error } = validatingStatus.validation(req.query);
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
        return;
      }
    const findUnsoldCars = 'SELECT * FROM cars WHERE status = $1';
    const value = req.query.status;
    const unsoldCars = await pool.query(findUnsoldCars, [value]);

    if (!unsoldCars.rows[0]) {
      res.status(404).json({
        status: 404,
        message: 'No available car found',
        data: [],
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: unsoldCars.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default getUnsoldCars;
