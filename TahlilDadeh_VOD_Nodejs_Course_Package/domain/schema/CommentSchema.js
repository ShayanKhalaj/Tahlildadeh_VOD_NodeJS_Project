import mongoose from "mongoose";

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentId:{
        type:Schema.ObjectId,
        unique:true,
        auto:true,
        index:true
    },
    text:{
        type:String,
        required:true,
        max:[200,'comment max len is 200 chars']
    },
    isAccepted:Boolean,
    answer:{
        type:String,
        max:[500,'answer max len is 500 chars']
    },
    movieId:{
        type:Schema.ObjectId,
        ref:'movies'
    },
    userId:{
        type:Schema.ObjectId,
        ref:'users'
    },
    username:String
})

export default CommentSchema