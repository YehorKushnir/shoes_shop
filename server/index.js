require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/error-middleware')
const filePathMiddleware = require('./middlewares/filepath.middleware')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(filePathMiddleware(path.resolve(__dirname, 'images')))
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, 'http://212.224.118.153:8080', 'https://learnhistoryofukraine.online']
}))
app.use(router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, console.log('Success ' + PORT))
    } catch (error) {
        console.log(error)
    }
}
start()