import Joi from 'joi';

const validateunsoldMake = {

  validation(unsoldMake) {
    const unsoldSchema = {
      status: Joi.string().required(),
      manufacturer: Joi.string().required(),
    };
    return Joi.validate(unsoldMake, unsoldSchema);
  },
};

export default validateunsoldMake;
