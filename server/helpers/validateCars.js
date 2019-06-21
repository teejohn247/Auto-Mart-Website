import Joi from 'joi';

const validateCars = {

  validation(newAd) {
    const newAdSchema = {
      owner: Joi.number().required(),
      product_image: Joi.string().required(),
      state: Joi.string().valid('new', 'used').required(),
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
