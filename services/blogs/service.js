const { User, Blog } = require('../../models')
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
      const user = await User.findById(query.blog.ownerId)
      if (!user) {
        return notFoundFailure(
          `User with id ${query.blog.ownerId} was not found`
        )
      }

      const blog = new Blog(query.blog)
      await blog.save()

      user.blogs.push(blog.id)
      await user.save()

      return success(blog)
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

      const user = await User.findById(blog.ownerId)
      user.blogs = user.blogs.filter((blogId) => !blogId.equals(blog._id))
      await user.save()

      await Blog.deleteOne({ _id: query.id })
      return success()
    },
    schema: schemas.deleteQuery,
  }),
}

module.exports = service
