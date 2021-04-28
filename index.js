const express = require('express')
const dotenv = require('dotenv')
const routers = require('./routers')

dotenv.config()

const app = express()
app.use(express.json())

app.use('/blogs', routers.blogs)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
