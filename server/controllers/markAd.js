import moment from 'moment';
import validateUpdateStatus from '../helpers/markAd';
import pool from '../models/database';

const markadsold = async (req, res) => {
  try {
    const { error } = validateUpdateStatus.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }
    const findCarId = 'SELECT * FROM cars WHERE id = $1';
    const value = parseInt(req.params.id, 10);
    const car = await pool.query(findCarId, [value]);

    if (!car.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'car post not found',
      });
    }
    if (req.payload.id !== car.rows[0].owner) {
      res.status(401).json({
        status: 401,
        error: 'you are unathorized to view this content',
      });
    }
    if (car.rows[0].status === req.body.status) {
      res.status(400).json({
        status: 400,
        error: `The car is already marked as ${car.rows[0].status}`,
      });
    }
    if (req.body.status === 'available') {
      res.status(400).json({
        status: 400,
        error: 'you can not set the status of the car to available when it is sold!!',
      });
      return;
    }

    const carStatus = 'UPDATE cars SET status = $1 WHERE id = $2';
    const values = [req.body.status, value];
    await pool.query(carStatus, values);

    const newCar = {
      id: car.rows[0].id,
      email: car.rows[0].email,
      owner: car.rows[0].owner,
      created_on: moment().format('LL'),
      manufacturer: car.rows[0].manufacturer,
      model: car.rows[0].model,
      price: car.rows[0].price,
      state: car.rows[0].state,
      status: req.body.status,
    };

    res.status(200).json({
      status: 200,
      data: newCar,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default markadsold;
