const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    profileImage:{
        type:String,
        required:[true,"Profile image is required"]
    },
    fullname:{
        type:String,
        required:[true,"Fullname is required"]
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    bio:{
        type:String
    }
},{
    timestamps:true
})

const Profile = mongoose.model("Profile",profileSchema)