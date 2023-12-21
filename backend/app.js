const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/userRouters')
const requestLogger = require('./middleware/requestLogger')

const app = express()
app.use(cors())
app.use(express.json())
// app.use(requestLogger)
app.use('/users', userRouter)
app.all('*', (request, response) => {
  response.status(404).json({
    status: 'failed',
    message: `Cant find ${request.originalUrl}`,
  })
})

module.exports = app
