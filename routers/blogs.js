const express = require('express')
const { Blog } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ ownerId: req.query.owner })
    res.status(200).json(blogs)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while retrieving blogs', error })
  }
})

router.get('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId)
    res.status(200).json(blog)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while retrieving blog', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = new Blog({ ...req.body })
    await blog.save()

    res.status(201).json(blog)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while creating blog', error })
  }
})

router.put('/:blogId', async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      { _id: req.params.blogId },
      { $set: req.body },
      { useFindAndModify: false }
    )
    res.sendStatus(204)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while updating blog', error })
  }
})

router.delete('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.blogId)
    res.status(200).json(blog)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while deleting blog', error })
  }
})

module.exports = router
