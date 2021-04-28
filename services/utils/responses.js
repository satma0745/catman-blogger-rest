const success = (details) => ({
  success: true,
  details,
})

const failure = (details) => ({
  success: false,
  details,
})

const notFoundFailure = (message) => failure({ notFound: true, message })

module.exports = {
  success,
  failure,
  notFoundFailure,
}
