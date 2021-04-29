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
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = model('blogs', blogSchema)

module.exports = Blog
