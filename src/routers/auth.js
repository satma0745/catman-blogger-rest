const express = require('express')
const service = require('../services/auth')
const { handler } = require('./utils')

const router = express.Router()

router.post(
  '/',
  ...handler({ handle: (req) => service.authorize({ auth: req.body }) })
)

module.exports = router
