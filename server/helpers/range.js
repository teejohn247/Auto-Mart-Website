import Joi from 'joi';

const validateRange = {

  validation(range) {
    const newPriceSchema = {
      min_price: Joi.number().required(),
      max_price: Joi.number().required(),
    };
    return Joi.validate(range, newPriceSchema);
  },

};

export default validateRange;
