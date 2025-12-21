import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    title:{
      type:String,
      required:true,
      unique:true,  
    },
    image:{
        type:String,
        default:'https://plus.unsplash.com/premium_vector-1682310597209-306e3bc6c873?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true})

const Post =mongoose.model('Post',PostSchema)

export default Post;