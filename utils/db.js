const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb connected')
    } catch (error) {
        console.log('error connecting mongodb', error)
        process.exit(1)
    }
}

module.exports = {
    connectDB : connectDB
}