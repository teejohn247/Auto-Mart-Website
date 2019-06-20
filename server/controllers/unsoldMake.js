import pool from '../models/database';

const getUsedManufacturer = async (req, res) => {
  try {
    const findUsedManufacturer = 'SELECT * FROM cars WHERE status = $1 AND manufacturer = $2';
    const values = [req.query.status, req.query.manufacturer];
    const unSoldMake = await pool.query(findUsedManufacturer, values);

    if (!unSoldMake.rows[0]) {
      res.status(404).json({
        status: 404,
        message: 'No available car found',
        data: [],
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: unSoldMake.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default getUsedManufacturer;
