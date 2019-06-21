import Joi from 'joi';

const validateUnsoldCars = {

  validation(unsoldCars) {
    const unsoldSchema = {
      status: Joi.string().required(),
      state: Joi.string().required(),
    };
    return Joi.validate(unsoldCars, unsoldSchema);
  },
};

export default validateUnsoldCars;
