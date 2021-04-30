const Joi = require('joi')

const authorizeQuery = Joi.object().keys({
  auth: Joi.object()
    .keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
    .required(),
})

module.exports = { authorizeQuery }
