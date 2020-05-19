const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const rp = require('request-promise')
const serveStatic = require('serve-static')
const { port, apiUrl } = require('./config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

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

// Serve static files from build folder
app.use(serveStatic(__dirname))
app.use(serveStatic(path.join(__dirname, '../build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.listen(port, () => console.log(`Server listening http://localhost:${port}`))
