const { User, Blog } = require('../../models')
const {
  handler,
  responses: {
    success,
    notFoundFailure,
    fieldValidationFailure,
    accessViolationFailure,
  },
} = require('../utils')
const schemas = require('./schemas')

const service = {
  getSingle: handler({
    handle: async (query) => {
      const user = await User.findById(query.id)
      if (!user) {
        return notFoundFailure(`User with id ${query.id} was not found`)
      }

      return success(user)
    },
    schema: schemas.getSingleQuery,
  }),

  register: handler({
    handle: async (query) => {
      if (await User.usernameIsTaken(query.user.username)) {
        return fieldValidationFailure({
          path: ['user', 'username'],
          type: 'username.unique',
          message: 'username must be unique',
        })
      }

      if (
        query.user.role === 'moderator' &&
        !(await User.isModerator(query.requestor?.id))
      ) {
        return accessViolationFailure()
      }

      const user = new User(query.user)
      await user.save()

      return success(user)
    },
    schema: schemas.registerQuery,
  }),

  update: handler({
    handle: async (query) => {
      if (
        query.requestor.id !== query.id &&
        !(await User.isModerator(query.requestor?.id))
      ) {
        return accessViolationFailure()
      }

      const user = await User.findById(query.id)
      if (!user) {
        return notFoundFailure(`User with id ${query.id} was not found`)
      }

      if (await user.usernameIsTaken(query.user.username)) {
        return fieldValidationFailure({
          path: ['user', 'username'],
          type: 'username.unique',
          message: 'username must be unique',
        })
      }

      await User.updateOne({ _id: query.id }, { $set: query.user })
      return success()
    },
    schema: schemas.updateQuery,
  }),

  delete: handler({
    handle: async (query) => {
      if (
        query.requestor.id !== query.id &&
        !(await User.isModerator(query.requestor?.id))
      ) {
        return accessViolationFailure()
      }

      const user = await User.findById(query.id)
      if (!user) {
        return notFoundFailure(`User with id ${query.id} was not found`)
      }

      await Blog.deleteMany({ ownerId: user.id })

      await User.deleteOne({ _id: query.id })
      return success()
    },
    schema: schemas.deleteQuery,
  }),
}

module.exports = service
