const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const path = require('path')
const rp = require('request-promise')
const serveStatic = require('serve-static')

const app = express()

const port = process.env.PORT || '4000'
const apiUrl = 'https://api.stocktwits.com/api/2/streams/symbol/'

app.use(favicon(__dirname + '/build/favicon.ico'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

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

// Serve static files from build folder
//app.use(express.static(path.join(__dirname, '../build')))
app.use(serveStatic(__dirname))
app.use(serveStatic(path.join(__dirname, 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log(`Server listening http://localhost:${port}`))
