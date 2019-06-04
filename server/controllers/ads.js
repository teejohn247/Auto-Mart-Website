import postCars from '../models/postCars';
import users from '../models/users';
import validateCars from '../helpers/validateCars';

const postAds = (req, res) => {
  const { error } = validateCars.validation(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }

  const postAd = {
    id: parseInt(postCars.length + 1, 10),
    createdOn: Date(),
    owner: req.body.owner,
    email: req.body.email,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    price: req.body.price,
    state: req.body.state,
    productImage: req.body.productImage,
    status: req.body.status
  };

  const user = users.find(p => p.email === postAd.email);
  if (!user) {
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  postCars.push(postAd);
  return res.status(201).json({
    status: 201,
    data: postAd
  });
};

export default postAds;
