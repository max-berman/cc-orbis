const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const rp = require('request-promise')

const app = express()
const port = process.env.PORT || '4000'
const apiUrl = 'https://api.stocktwits.com/api/2/streams/symbol/'

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
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')))
}

app.listen(port, () => console.log(`Server listening http://localhost:${port}`))
