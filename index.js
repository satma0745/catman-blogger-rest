const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.get('/', (_, res) => {
  res.send('catman-blogger-rest')
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
