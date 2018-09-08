const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
const got = require('got')

app.use(bodyParser.json())

const discord_webhook_url = process.env.DISCORD_WEBHOOK_URL
const line_channel_token = process.env.LINE_CHANNEL_TOKEN

const get_user_info = async (user_id) => {
  const resp = await got(`https://api.line.me/v2/bot/profile/${user_id}`, {
    method: 'GET',
    json: true,
    headers: {
      Authorization: `Bearer ${line_channel_token}`
    }
  })
  return {name: resp.body.displayName, avatar: resp.body.pictureUrl}
}

app.post('/', asyncHandler(async (req, res) => {
  for (const event of req.body['events']) {
    const user = event.source['userId']
    const text = event.message['text']

    try {
      const user_info = await get_user_info(user)
      await got(discord_webhook_url, {
        json: true,
        body: {
          "avatar_url": user_info.avatar,
          "username": user_info.name.substr(0, 32),
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
