const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next() ;
    
    try {
        this.password = await bcrypt.hash(this.password,10)
    } catch (error) {
        next(error)
    }
    
    })

const User = mongoose.model("User",userSchema)

module.exports = User