const { Blog } = require('../../models')
const {
  success,
  failure,
  notFoundFailure,
  validationFauilure,
} = require('../utils/responses')
const schemas = require('./schemas')

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
}

class BlogService {
  async getMany(query) {
    try {
      const validatedQuery = await schemas.getManyQuery.validateAsync(
        query,
        validationOptions
      )

      const blogs = await Blog.find(validatedQuery)
      return success(blogs)
    } catch (error) {
      if (error.name === 'ValidationError') {
        return validationFauilure(
          error.details.map(({ message, type }) => ({ message, type }))
        )
      }

      return failure(error)
    }
  }

  async getSingle(query) {
    try {
      const validatedQuery = await schemas.getSingleQuery.validateAsync(
        query,
        validationOptions
      )

      const blog = await Blog.findById(validatedQuery.id)
      if (!blog) {
        return notFoundFailure(
          `Blog with id ${validatedQuery.id} was not found`
        )
      }

      return success(blog)
    } catch (error) {
      if (error.name === 'ValidationError') {
        return validationFauilure(
          error.details.map(({ message, type }) => ({ message, type }))
        )
      }

      return failure(error)
    }
  }

  async create(query) {
    try {
      const schema = schemas.createQuery
      const validatedQuery = await schema.validateAsync(
        query,
        validationOptions
      )

      const created = new Blog(validatedQuery.blog)
      await created.save()

      return success(created)
    } catch (error) {
      if (error.name === 'ValidationError') {
        return validationFauilure(
          error.details.map(({ message, type }) => ({ message, type }))
        )
      }

      return failure(error)
    }
  }

  async update(query) {
    try {
      const validatedQuery = await schemas.updateQuery.validateAsync(
        query,
        validationOptions
      )

      const old = await Blog.findById(validatedQuery.id)
      if (!old) {
        return notFoundFailure(
          `Blog with id ${validatedQuery.id} was not found`
        )
      }

      await Blog.updateOne(
        { _id: validatedQuery.id },
        { $set: validatedQuery.blog }
      )
      return success()
    } catch (error) {
      if (error.name === 'ValidationError') {
        return validationFauilure(
          error.details.map(({ message, type }) => ({ message, type }))
        )
      }

      return failure(error)
    }
  }

  async delete(query) {
    try {
      const validatedQuery = await schemas.deleteQuery.validateAsync(
        query,
        validationOptions
      )

      const blog = await Blog.findById(validatedQuery.id)
      if (!blog) {
        return notFoundFailure(
          `Blog with id ${validatedQuery.id} was not found`
        )
      }

      await Blog.deleteOne({ _id: validatedQuery.id })
      return success()
    } catch (error) {
      if (error.name === 'ValidationError') {
        return validationFauilure(
          error.details.map(({ message, type }) => ({ message, type }))
        )
      }

      return failure(error)
    }
  }
}

const serviceInstance = new BlogService()

module.exports = serviceInstance
