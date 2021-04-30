const { Schema, model } = require('mongoose')

const blogSchema = Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = model('Blog', blogSchema)

module.exports = Blog
