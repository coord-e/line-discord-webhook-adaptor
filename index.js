const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/', (req, res) => {
  for (const event of req.body['events']) {
    console.log(event.source['userId'])
    console.log(event.message['text'])
  }
  res.status(200).end()
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
