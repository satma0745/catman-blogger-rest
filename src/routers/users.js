const express = require('express')
const service = require('../services/users')
const { handler } = require('./utils')

const router = express.Router()

router.get(
  '/:userId',
  ...handler({ handle: (req) => service.getSingle({ id: req.params.userId }) })
)

router.post(
  '/',
  ...handler({
    handle: (req) =>
      service.register({
        user: req.body,
        requestor: req.currentUser,
      }),
  })
)

router.put(
  '/:userId',
  ...handler({
    handle: (req) =>
      service.update({
        id: req.params.userId,
        user: req.body,
        requestor: req.currentUser,
      }),
    requireAuth: true,
  })
)

router.delete(
  '/:userId',
  ...handler({
    handle: (req) =>
      service.delete({
        id: req.params.userId,
        requestor: req.currentUser,
      }),
    requireAuth: true,
  })
)

module.exports = router
