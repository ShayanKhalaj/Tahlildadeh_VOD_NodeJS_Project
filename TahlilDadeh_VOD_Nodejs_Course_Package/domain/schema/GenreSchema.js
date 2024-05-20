import mongoose from "mongoose";

const Schema = mongoose.Schema

const GenreSchema = new Schema({
    genreId:{
        type:Schema.ObjectId,
        auto:true,
        index:true,
        unique:true
    },
    genreName:{
        type:String,
        required:[true,"genre is required"],
        max:[50,'max len is 50 chars']
    },
    description:{
        type:String,
        max:[200,'max len 200 chars']
    },
    movies:[{
        type:Schema.ObjectId,
        ref:'movies'
    }]
})

export default GenreSchema