const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.send('Hello Anonymous (:')
})

const api = require('./routes')

app.use(api.login)
app.use(api.register)
app.use(api.jobs)

/* Error handler middleware */
app.use((err, req, res, next) => {
  const status = 500
  console.error(err.message, err.stack)
  res.status(status).json({
    'message': err.message
  })

  return
})

app.listen(port, () => {
  console.log(`Server ready at port : ${port}`)
})