const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()

const rp = require('request-promise')
const app = express()
const { port, apiUrl } = require('./config')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(pino)

// Proxy to serve Stock Twits API
app.post('/api', ({ body: { symbol } }, res) => {
  const options = {
    method: 'GET',
    uri: `${apiUrl}${symbol}.json`,
    json: true,
    headers: { 'Content-Type': 'application/json' },
  }
  rp(options)
    .then((result) => {
      res.send(JSON.stringify(result))
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => console.log(`Server listening http://localhost:${port}`))
