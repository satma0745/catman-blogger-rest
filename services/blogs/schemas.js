const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const rules = {
  id: () => Joi.objectId(),
  title: () => Joi.string().max(150),
  description: () => Joi.string().max(500),
  ownerId: () => Joi.objectId(),
}

const getManyQuery = Joi.object().keys({
  ownerId: rules.ownerId(),
})

const getSingleQuery = Joi.object().keys({
  id: rules.id().required(),
})

const createQuery = Joi.object().keys({
  blog: Joi.object().keys({
    title: rules.title().required(),
    description: rules.description().required(),
    ownerId: rules.ownerId().required(),
  }),
})

const updateQuery = Joi.object().keys({
  id: rules.id().required(),
  blog: Joi.object().keys({
    title: rules.title().required(),
    description: rules.description().required(),
  }),
})

const deleteQuery = Joi.object().keys({
  id: rules.id().required(),
})

module.exports = {
  getManyQuery,
  getSingleQuery,
  createQuery,
  updateQuery,
  deleteQuery,
}
