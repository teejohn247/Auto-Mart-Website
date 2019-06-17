import Joi from 'joi';

const validateCars = {

  validation(newAd) {
    const newAdSchema = {
      created_on: Joi.string().required(),
      owner: Joi.number().required(),
      email: Joi.string().email().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string().valid('new', 'used').required(),
      product_image: Joi.string().required(),
      status: Joi.string().required(),
      body_type: Joi.string()

    };
    return Joi.validate(newAd, newAdSchema);
  },

};

export default validateCars;
