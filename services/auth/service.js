const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const {
  handler,
  responses: { success, notFoundFailure, fieldValidationFailure },
} = require('../utils')
const schemas = require('./schemas')

const service = {
  authorize: handler({
    handle: async (query) => {
      const user = await User.findOne({ username: query.auth.username })
      if (!user) {
        return notFoundFailure(
          `User with username ${query.auth.username} was not found`
        )
      }

      if (user.password !== query.auth.password) {
        return fieldValidationFailure({
          path: ['auth', 'password'],
          type: 'password.incorrect',
          message: `Incorrect password`,
        })
      }

      return success({
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }),
        user: {
          username: user.username,
          displayName: user.displayName,
        },
      })
    },
    schema: schemas.authorizeQuery,
  }),
}

module.exports = service
