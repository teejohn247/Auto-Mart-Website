import pool from '../models/database';

const postAds = async (req, res) => {
  try {
    const postAd = {
    token: req.headers.authorization,
    owner: req.payload.id,
    created_on: Date(),
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    price: req.body.price,
    state: req.body.state,
    product_image: req.body.product_image,
    status: req.body.status,
    body_type: req.body.body_type
  };
    const insertCar = await pool.query('INSERT INTO cars(owner, created_on, product_image,state, status, price, manufacturer, model, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        postAd.owner,
        postAd.created_on,
        postAd.product_image,
        postAd.state,
        postAd.status,
        postAd.price,
        postAd.manufacturer,
        postAd.model,
        postAd.body_type
      ]);

    res.status(201).json({
      status: 201,
      data: {
        id: insertCar.rows[0].id,
        owner: insertCar.rows[0].owner,
        created_on: insertCar.rows[0].created_on,
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
