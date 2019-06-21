import pool from '../models/database';

const deletePosted = async (req, res) => {
  try {
    const findCar = 'SELECT * FROM cars WHERE id = $1';
    const value = parseInt(req.params.id, 10);
    const car = await pool.query(findCar, [value]);
    if (!req.user.is_admin) {
      res.status(401).json({
         status: 401,
         error: 'You are not authorized to perform this action',
       });
       return;
     }
    if (!car.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'Car Ad not found',
      });
      return;
    }
    const deleteCar = 'DELETE FROM cars WHERE id = $1';
    await pool.query(deleteCar, [value]);

    res.status(200).send({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};

export default deletePosted;
