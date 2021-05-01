const { jwtAuthMiddleware } = require('../middlewares')

const handler = ({ handle, requireAuth = false }) => [
  jwtAuthMiddleware({ required: requireAuth }),
  (req, res) =>
    handle(req)
      .then((result) => res.status(200).json(result))
      .catch(() => res.sendStatus(500)),
]

module.exports = { handler }
