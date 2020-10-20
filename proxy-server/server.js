const express = require('express')
const axios = require('axios')
const app = express()
const port = 3001

app.get('*', async (req, res) => {
  const { data } = await axios.get(`https://jobs.github.com/${req.params[0]}`)
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})