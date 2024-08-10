const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('./utils/errorHandler')


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
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








