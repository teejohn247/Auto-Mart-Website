import Joi from 'joi';

const validateView = {

  validation(view) {
    const newUserSchema = {
      status: Joi.string().required(),
    };
    return Joi.validate(view, newUserSchema);
  },
};

export default validateView;
