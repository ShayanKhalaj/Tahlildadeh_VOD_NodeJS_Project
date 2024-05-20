import mongoose from "mongoose";

const Schema = mongoose.Schema

const BoxSchema = new Schema({
    boxId:{
        type:Schema.ObjectId,
        index:true,
        unique:true,
        auto:true
    },
    title:{
        type:String,
        required:[true,'title is required'],
        max:[100,'title max len is 100 chars']
    },
    description:{
        type:String,
        max:[200,'description max len is 200 chars']
    },
    boxMovies:[{
        type:Schema.ObjectId,
        ref:'boxMovies'
    }]
})

export default BoxSchema