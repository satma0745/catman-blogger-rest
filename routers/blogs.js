const express = require('express')
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
  handler((req) => service.create({ blog: req.body }))
)

router.put(
  '/:blogId',
  handler((req) =>
    service.update({
      id: req.params.blogId,
      blog: req.body,
    })
  )
)

router.delete(
  '/:blogId',
  handler((req) => service.delete({ id: req.params.blogId }))
)

module.exports = router
