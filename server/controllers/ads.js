import validateCars from '../helpers/validateCars';
import pool from '../models/database';

const postAds = async (req, res) => {
  try {
    const { error } = validateCars.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400, error: error.details[0].message,
      });
      return;
    }
    const postAd = {
    owner: req.body.owner,
    created_on: Date(),
    email: req.body.email,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    price: req.body.price,
    state: req.body.state,
    product_image: req.body.product_image,
    status: req.body.status,
    body_type: req.body.body_type
  };
    const insertCar = await pool.query('INSERT INTO cars VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        postAd.owner,
        postAd.created_on,
        postAd.email,
        postAd.manufacturer,
        postAd.model,
        postAd.price,
        postAd.state,
        postAd.product_image,
        postAd.status,
        postAd.body_type
      ]);

    res.status(201).json({
      status: 201,
      data: {
        created_on: insertCar.rows[0].created_on,
        email: insertCar.rows[0].email,
        manufacturer: insertCar.rows[0].manufacturer,
        model: insertCar.rows[0].model,
        price: insertCar.rows[0].price,
        state: insertCar.rows[0].state,
        status: insertCar.rows[0].status,
        product_image: insertCar.rows[0].product_image
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};

export default postAds;
