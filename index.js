const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
const got = require('got')

app.use(bodyParser.json())

app.post('/', asyncHandler(async (req, res) => {
  for (const event of req.body['events']) {
    const user = event.source['userId']
    const text = event.message['text']
    try {
      await got('url', {
        json: true,
        body: {
          "username": user.substr(0, 32),
          "content": text
        }
      })
    }catch(e) {
      console.log(e.response.body)
    }
  }
  res.status(200).end()
}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
