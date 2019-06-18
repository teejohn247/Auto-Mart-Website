import pool from '../models/database';

const getBodyType = async (req, res) => {
  try {
    const findBodyType = 'SELECT * FROM cars WHERE body_type = $1';
    const value = req.query.body_type;
    const bodyType = await pool.query(findBodyType, [value]);

    if (!bodyType.rows[0]) {
      res.status(404).json({
        status: 404,
        message: 'No available car found',
        data: [],
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: bodyType.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default getBodyType;
