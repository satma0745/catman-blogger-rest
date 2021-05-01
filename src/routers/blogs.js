const express = require('express')
const service = require('../services/blogs')
const { handler } = require('./utils')

const router = express.Router()

router.get(
  '/',
  ...handler({ handle: (req) => service.getMany({ ownerId: req.query.owner }) })
)

router.get(
  '/:blogId',
  ...handler({ handle: (req) => service.getSingle({ id: req.params.blogId }) })
)

router.post(
  '/',
  ...handler({
    handle: (req) =>
      service.create({
        blog: req.body,
        requestor: req.currentUser,
      }),
    requireAuth: true,
  })
)

router.put(
  '/:blogId',
  ...handler({
    handle: (req) =>
      service.update({
        id: req.params.blogId,
        blog: req.body,
        requestor: req.currentUser,
      }),
    requireAuth: true,
  })
)

router.delete(
  '/:blogId',
  ...handler({
    handle: (req) =>
      service.delete({
        id: req.params.blogId,
        requestor: req.currentUser,
      }),
    requireAuth: true,
  })
)

module.exports = router
