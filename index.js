const express = require('express')
const app = express()

app.post('/', (req, res) => {
  res.send('POST request to the homepage');
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
