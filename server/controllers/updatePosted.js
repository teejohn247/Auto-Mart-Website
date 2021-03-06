import moment from 'moment';
import pool from '../models/database';

const updatePriceCar = async (req, res) => {
  try {
    const findCarId = 'SELECT * FROM cars WHERE id = $1';
    const value = parseInt(req.params.id, 10);
    const carId = await pool.query(findCarId, [value]);
    if (!carId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'Car post not found',
      });
      return;
    }
    if (req.payload.id !== carId.rows[0].owner) {
      res.status(401).json({
        status: 401,
        error: 'You are unauthorized to update this content',
      });
      return;
    }
    const updateCar = 'UPDATE cars SET price = $1 WHERE id = $2';
    const values = [req.body.price, value];
    await pool.query(updateCar, values);

    const carUpdated = {
      id: carId.rows[0].id,
      owner: carId.rows[0].owner,
      created_on: moment().format('LL'),
      state: carId.rows[0].state,
      status: carId.rows[0].status,
      price: req.body.price,
      product_image: carId.rows[0].product_image,
      manufacturer: carId.rows[0].manufacturer,
      model: carId.rows[0].model,
      body_type: carId.rows[0].body_type,
    };

    res.status(200).json({
      status: 200,
      data: carUpdated,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default updatePriceCar;
