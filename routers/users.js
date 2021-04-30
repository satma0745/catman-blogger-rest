const express = require('express')
const { jwtAuthMiddleware } = require('../middlewares')
const service = require('../services/users')
const { handler } = require('./utils')

const router = express.Router()

router.get(
  '/:userId',
  handler((req) => service.getSingle({ id: req.params.userId }))
)

router.post(
  '/',
  handler((req) => service.register({ user: req.body }))
)

router.put(
  '/:userId',
  jwtAuthMiddleware,
  handler((req) =>
    service.update({
      id: req.params.userId,
      user: req.body,
      requestor: req.currentUser,
    })
  )
)

router.delete(
  '/:userId',
  jwtAuthMiddleware,
  handler((req) =>
    service.delete({
      id: req.params.userId,
      requestor: req.currentUser,
    })
  )
)

module.exports = router
