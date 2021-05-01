const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const rules = {
  id: () => Joi.objectId(),
  username: () =>
    Joi.string()
      .trim()
      .min(6)
      .max(20)
      .pattern(/^[A-Za-z0-9_]*$/),
  password: () =>
    Joi.string()
      .trim()
      .min(6)
      .max(20)
      // Alphanumeric with underscores: requires underscores, digits, lowercase and uppercase letters
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*_)[A-Za-z0-9_]*$/),
  displayName: () => Joi.string().trim().max(100),
  role: () => Joi.string().valid('user', 'moderator'),
}

const getSingleQuery = Joi.object().keys({
  id: rules.id().required(),
})

const registerQuery = Joi.object().keys({
  user: Joi.object()
    .keys({
      username: rules.username().required(),
      password: rules.password().required(),
      displayName: rules.displayName().required(),
      role: rules.role().default('user'),
    })
    .required(),
  requestor: Joi.object().keys({
    id: rules.id().required(),
  }),
})

const updateQuery = Joi.object().keys({
  id: rules.id().required(),
  user: Joi.object()
    .keys({
      username: rules.username().required(),
      password: rules.password().required(),
      displayName: rules.displayName().required(),
    })
    .required(),
  requestor: Joi.object()
    .keys({
      id: rules.id().required(),
    })
    .required(),
})

const deleteQuery = Joi.object().keys({
  id: rules.id().required(),
  requestor: Joi.object()
    .keys({
      id: rules.id().required(),
    })
    .required(),
})

module.exports = {
  getSingleQuery,
  registerQuery,
  updateQuery,
  deleteQuery,
}
