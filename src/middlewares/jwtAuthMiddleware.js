const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.sendStatus(401)
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      res.sendStatus(401)
    } else {
      req.currentUser = user
      next()
    }
  })
}

module.exports = jwtAuthMiddleware
