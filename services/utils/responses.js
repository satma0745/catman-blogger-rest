const success = (details) => ({
  success: true,
  details,
})

const failure = (details) => ({
  success: false,
  details,
})

const notFoundFailure = (message) =>
  failure({
    notFound: true,
    message,
  })

const validationFailure = (errors) =>
  failure({
    validation: true,
    errors,
  })

const fieldValidationFailure = ({ path, type, message }) =>
  validationFailure([{ path, type, message }])

module.exports = {
  success,
  failure,
  notFoundFailure,
  validationFailure,
  fieldValidationFailure,
}
