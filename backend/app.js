const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')


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




module.exports = app








