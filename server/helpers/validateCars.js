import Joi from 'joi';

const validateCars = {

  validation(newAd) {
    const newAdSchema = {
      product_image: Joi.string().required(),
      state: Joi.string().valid('New', 'Used').required(),
      status: Joi.string().required(),
      price: Joi.number().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      body_type: Joi.string()
    };
    return Joi.validate(newAd, newAdSchema);
  },

};
export default validateCars;
