const { validationFailure, failure } = require('./responses')

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
}

const handler = ({ handle, schema }) => async (query) => {
  try {
    const validatedQuery = await schema.validateAsync(query, validationOptions)

    return await handle(validatedQuery)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return validationFailure(
        error.details.map(({ message, type }) => ({ message, type }))
      )
    }

    return failure(error)
  }
}

module.exports = handler
