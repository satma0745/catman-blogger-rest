const express = require('express')

const router = express.Router()

router.get('/:blogId', (req, res) => {
  res.json({ id: req.params.blogId, title: 'Samble blog title' })
})

router.post('/', (req, res) => {
  res.json(req.body)
})

router.put('/:blogId', (req, res) => {
  res.json({ id: req.params.blogId, ...req.body })
})

router.delete('/:blogId', (req, res) => {
  res.status(204).send(`Delete blog with id ${req.params.blogId}`)
})

module.exports = router
