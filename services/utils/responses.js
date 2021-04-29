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

const validationFauilure = (errors) =>
  failure({
    validation: true,
    errors,
  })

module.exports = {
  success,
  failure,
  notFoundFailure,
  validationFauilure,
}
