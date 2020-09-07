const Joi = require(`@hapi/joi`);

//Validation!!! YEES

//Register validation schema
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required().max(255),
    email: Joi.string().min(6).required().email().max(255),
    password: Joi.string().min(6).required().max(1024),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().max(255),
    password: Joi.string().min(6).required().max(1024),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
