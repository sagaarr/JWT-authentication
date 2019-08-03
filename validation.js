const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().email({
      minDomainSegments: 2
    }).required(),
    password: Joi.string().min(6).max(1024).required()
  };


  return Joi.validate(data, schema);
}
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().email({
      minDomainSegments: 2
    }).required(),
    password: Joi.string().min(6).max(1024).required()
  };


  return Joi.validate(data, schema);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation