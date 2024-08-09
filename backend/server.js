require('dotenv').config()
const app = require('./app')
const connectDb = require('./config/db')
const port = process.env.PORT || 5000

connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    })
})