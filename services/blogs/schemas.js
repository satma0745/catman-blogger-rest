const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const getManyQuery = Joi.object().keys({
  ownerId: Joi.objectId(),
})

const getSingleQuery = Joi.object().keys({
  id: Joi.objectId().required(),
})

const createQuery = Joi.object().keys({
  blog: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ownerId: Joi.objectId().required(),
  }),
})

const updateQuery = Joi.object().keys({
  id: Joi.objectId().required(),
  blog: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
})

const deleteQuery = Joi.object().keys({
  id: Joi.objectId().required(),
})

module.exports = {
  getManyQuery,
  getSingleQuery,
  createQuery,
  updateQuery,
  deleteQuery,
}
