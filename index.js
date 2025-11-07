const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB} = require('./utils/db')
const { authRouter } = require('./routes/auth.route')

app.use(express.json())
app.use(cors())


// routes
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/books', )
app.use('/api/v1/review', )
app.use('/api/v1/orders', )
app.use('/api/v1/payments', )



const port = process.env.PORT;

connectDB
    .then(()=>{
        app.listen(port)
        console.log(`port is running on ${port}`)
    })
    .catch(() => {
        console.log("mongodb connection failed", error)
        process.exit(1)
    })

