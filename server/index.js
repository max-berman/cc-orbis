const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const path = require('path')
const rp = require('request-promise')
const app = express()
const port = process.env.PORT || '4000'
const apiUrl = 'https://api.stocktwits.com/api/2/streams/symbol/'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(pino)

// Proxy to serve Stock Twits API
app.post('/api', (req, res) => {
  const {
    body: { symbol },
  } = req
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
