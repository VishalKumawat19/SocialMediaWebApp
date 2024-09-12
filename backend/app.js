const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('./utils/errorHandler')

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true

}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authRouter = require('./routes/authRoutes')
app.use('/api/v1/auth',authRouter)

const postRouter = require('./routes/postRoutes')
app.use('/api/v1/posts',postRouter)

const profileRouter = require('./routes/profileRoutes')
app.use('/api/v1/profile',profileRouter)

app.use(errorHandler)
module.exports = app








