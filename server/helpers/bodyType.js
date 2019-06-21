import Joi from 'joi';

const validateBodyType = {

  validation(bodyType) {
    const bodyTypeSchema = {
      body_type: Joi.string().required(),
    };
    return Joi.validate(bodyType, bodyTypeSchema);
  },

};

export default validateBodyType;
