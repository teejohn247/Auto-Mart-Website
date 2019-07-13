/* eslint-disable camelcase */
import pool from '../models/database';

const allposted = async (req, res) => {
  let findCars = 'SELECT * FROM cars';
  if (req.originalUrl.includes('?'));

  const { status } = req.query;
  if (status !== undefined) {
    findCars += ` WHERE status = '${status}'`;
  }

  const { state } = req.query;
  if (state !== undefined) {
    findCars += ` WHERE state = '${state}'`;
  }

  const { manufacturer } = req.query;
if (manufacturer !== undefined) {
findCars += ` WHERE manufacturer = '${manufacturer}'`;
}
const { body_type } = req.query;
if (body_type !== undefined) {
  findCars += ` AND body_type = '${body_type}'`;
}

const { owner } = req.query;
if (owner !== undefined) {
  findCars += ` AND owner_id = '${owner}'`;
}

  let { min_price, max_price } = req.query;
if (min_price !== undefined || max_price !== undefined) {
if (min_price === undefined) min_price = 1000;
if (max_price === undefined) max_price = Number.MAX_VALUE;
findCars += ` WHERE price >= ${min_price} AND price <= ${max_price}`;
}

  try {
    const cars = await pool.query(findCars);
    if (!cars.rows[0]) {
      res.status(404).json({
        status: 404,
        message: 'no car found',
        data: [],
      });
      return;
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
