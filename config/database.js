const mongoose = require('mongoose')

const connect = (onSuccess = () => {}) => {
  mongoose.connection.once('open', () => {
    console.log('Connected to database')
    onSuccess()
  })

  mongoose.connection.on('error', (error) => {
    console.log({
      message: 'Error occured while connecting to database',
      error,
    })
  })

  const uri = process.env.MONGO_DB_CONNECTION_STRING
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  return mongoose.connect(uri, options)
}

module.exports = {
  connect,
  connection: mongoose.connection,
}
