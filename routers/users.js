const express = require('express')
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
  handler((req) =>
    service.update({
      id: req.params.userId,
      user: req.body,
    })
  )
)

router.delete(
  '/:userId',
  handler((req) => service.delete({ id: req.params.userId }))
)

module.exports = router
