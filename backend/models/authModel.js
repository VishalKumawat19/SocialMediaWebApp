const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exists"],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

module.exports = User