import mongoose from "mongoose";

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    movieId:{
        type:Schema.ObjectId,
        auto:true,
        index:true,
        unique:true
    },
    movieName:{
        type:String,
        required:[true,"movie name is required"],
        max:[100,"movie name's length cannot be more than 100 chars"]
    },
    coverImageUrl:{
        type:String,
        max:[2000,'max len is 2000 chars']
    },
    coverImageAlter:{
        type:String,
        max:[200,"max len is 200 chars"]
    },
    movieVideoUrl:{
        type:String,
        max:[2000,"max len is 2000 chars"]
    },
    description:{
        type:String,
        max:[200,"max len 200 chars"]
    },
    summary:{
        type:String,
        max:[400,'max len 400 chars']
    },
    time:{
        type:String,
        max:[12,'max len 12 chars']
    },
    minAge:Number,
    yearOfBuilt:Number,
    imdb:Number,
    hasSubText:Boolean,
    categoryId:{
        type:Schema.Types.String,
        ref:'categories'
    },
    genreId:{
        type:Schema.Types.String,
        ref:'genres'
    },
    directorId:{
        type:Schema.Types.String,
        ref:'directors'
    },
    musicianId:{
        type:Schema.Types.String,
        ref:'musicians'
    },
    authorId:{
        type:Schema.Types.String,
        ref:'authors'
    },
    comments:[{
        type:Schema.ObjectId,
        ref:'comments'
    }],
    actorMovies:[{
        type:Schema.ObjectId,
        ref:'actorMovies'
    }],
    boxMovies:[{
        type:Schema.ObjectId,
        ref:'boxMovies'
    }]
})


export default MovieSchema