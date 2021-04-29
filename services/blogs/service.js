const { Blog } = require('../../models')
const {
  handler,
  responses: { success, notFoundFailure },
} = require('../utils')
const schemas = require('./schemas')

const service = {
  getMany: handler({
    handle: async (query) => success(await Blog.find(query)),
    schema: schemas.getManyQuery,
  }),

  getSingle: handler({
    handle: async ({ id }) => success(await Blog.findById(id)),
    schema: schemas.getSingleQuery,
  }),

  create: handler({
    handle: async (query) => {
      const created = new Blog(query.blog)
      await created.save()

      return success(created)
    },
    schema: schemas.createQuery,
  }),

  update: handler({
    handle: async (query) => {
      const old = await Blog.findById(query.id)
      if (!old) {
        return notFoundFailure(`Blog with id ${query.id} was not found`)
      }

      await Blog.updateOne({ _id: query.id }, { $set: query.blog })
      return success()
    },
    schema: schemas.updateQuery,
  }),

  delete: handler({
    handle: async (query) => {
      const blog = await Blog.findById(query.id)
      if (!blog) {
        return notFoundFailure(`Blog with id ${query.id} was not found`)
      }

      await Blog.deleteOne({ _id: query.id })
      return success()
    },
    schema: schemas.deleteQuery,
  }),
}

module.exports = service
