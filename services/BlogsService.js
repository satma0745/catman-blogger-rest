const { Blog } = require('../models')
const { success, failure, notFoundFailure } = require('./utils/responses')

class BlogService {
  async getMany({ ownerId } = {}) {
    try {
      const blogs = await Blog.find({ ownerId })
      return success(blogs)
    } catch (error) {
      return failure(error)
    }
  }

  async getSingle(id) {
    try {
      const blog = await Blog.findById(id)
      if (!blog) {
        return notFoundFailure(`Blog with id ${id} was not found`)
      }

      return success(blog)
    } catch (error) {
      return failure(error)
    }
  }

  async create(blog) {
    try {
      const created = new Blog({ ...blog })
      await created.save()

      return success(created)
    } catch (error) {
      return failure(error)
    }
  }

  async update(id, blog) {
    try {
      const old = await Blog.findById(id)
      if (!old) {
        return notFoundFailure(`Blog with id ${id} was not found`)
      }

      await Blog.updateOne({ _id: id }, { $set: blog })
      return success()
    } catch (error) {
      return failure(error)
    }
  }

  async delete(id) {
    try {
      const blog = await Blog.findById(id)
      if (!blog) {
        return notFoundFailure(`Blog with id ${id} was not found`)
      }

      await Blog.deleteOne({ _id: id })
      return success()
    } catch (error) {
      return failure(error)
    }
  }
}

const serviceInstance = new BlogService()

module.exports = serviceInstance
