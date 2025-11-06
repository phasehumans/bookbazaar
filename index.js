const express = require('express')
const app = express()

app.use(express.json())

app.use('/api/v1/')


app.listen(4000)