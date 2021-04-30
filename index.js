const express = require('express')
const dotenv = require('dotenv')
const { database } = require('./config')
const routers = require('./routers')

dotenv.config()

const app = express()
app.use(express.json())

app.use('/blogs', routers.blogs)
app.use('/users', routers.users)
app.use('/auth', routers.auth)

database.connect(() => {
  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`Running on port ${port}`)
  })
})
