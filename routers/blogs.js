const express = require('express')
const service = require('../services/BlogsService')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await service.getMany({ ownerId: req.query.owner })
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while retrieving blogs', error })
  }
})

router.get('/:blogId', async (req, res) => {
  try {
    const result = await service.getSingle(req.params.blogId)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while retrieving blog', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await service.create(req.body)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while creating blog', error })
  }
})

router.put('/:blogId', async (req, res) => {
  try {
    const result = await service.update(req.params.blogId, req.body)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while updating blog', error })
  }
})

router.delete('/:blogId', async (req, res) => {
  try {
    const result = await service.delete(req.params.blogId)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while deleting blog', error })
  }
})

module.exports = router
