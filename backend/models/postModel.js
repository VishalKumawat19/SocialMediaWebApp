const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    profileImage:{
        type:String
    },
    imageUrl:{
        type:String,
        required:[true,"image is required"]
    },
    caption:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema)