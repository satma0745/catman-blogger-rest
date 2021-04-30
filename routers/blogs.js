const express = require('express')
const { jwtAuthMiddleware } = require('../middlewares')
const service = require('../services/blogs')
const { handler } = require('./utils')

const router = express.Router()

router.get(
  '/',
  handler((req) => service.getMany({ ownerId: req.query.owner }))
)

router.get(
  '/:blogId',
  handler((req) => service.getSingle({ id: req.params.blogId }))
)

router.post(
  '/',
  jwtAuthMiddleware,
  handler((req) =>
    service.create({
      blog: req.body,
      requestor: req.currentUser,
    })
  )
)

router.put(
  '/:blogId',
  jwtAuthMiddleware,
  handler((req) =>
    service.update({
      id: req.params.blogId,
      blog: req.body,
      requestor: req.currentUser,
    })
  )
)

router.delete(
  '/:blogId',
  jwtAuthMiddleware,
  handler((req) =>
    service.delete({
      id: req.params.blogId,
      requestor: req.currentUser,
    })
  )
)

module.exports = router
