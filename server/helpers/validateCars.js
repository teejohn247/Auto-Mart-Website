import Joi from 'joi';

const validateCars = {

  validation(newAd) {
    const newAdSchema = {
      owner: Joi.number().required(),
      email: Joi.string().email().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string().valid('new', 'used').required(),
      productImage: Joi.string().required(),
      status: Joi.string().required(),
    };
    return Joi.validate(newAd, newAdSchema);
  },

};

export default validateCars;
