const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/userRouters')
const requestLogger = require('./middleware/requestLogger')
const path = require('node:path')

const app = express()
app.use(cors())
app.use(express.json())
// app.use(requestLogger)
app.use('/users', userRouter)

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, 'frontend', 'dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (request, response) => {
    response
      .status(200)
      .json({ status: 'success', message: 'Api running successfully' })
  })
}

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'failed',
    message: `Cant find ${request.originalUrl}`,
  })
})

module.exports = app
