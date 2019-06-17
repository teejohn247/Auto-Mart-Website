import Joi from 'joi';


// signup
const validateUserSignup = {

  validation(newUser) {
    const newUserSchema = {
      users_id: Joi.number(),
      first_name: Joi.string().trim().min(3).required(),
      last_name: Joi.string().trim().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
      password: Joi.string().min(6).required(),
      address: Joi.string().trim().required(),
      is_admin: Joi.boolean(),
    };
    return Joi.validate(newUser, newUserSchema);
  },

};

export default validateUserSignup;
