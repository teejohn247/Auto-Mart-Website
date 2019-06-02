import Joi from 'joi';

const validateUserSignup = {

  validation(newUser) {
    const newUserSchema = {
      email: Joi.string().email().required(),
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      password: Joi.string().min(6).required(),
      address: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
    };
    return Joi.validate(newUser, newUserSchema);
  },

};

export default validateUserSignup;
