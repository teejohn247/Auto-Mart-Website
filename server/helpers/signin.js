import Joi from 'joi';

const validateUserSignin = {

  validation(newUser) {
    const newUserSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    };
    return Joi.validate(newUser, newUserSchema);
  },
};

export default validateUserSignin;
