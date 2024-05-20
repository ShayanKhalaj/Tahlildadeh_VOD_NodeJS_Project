import mongoose from "mongoose";

const Schema = mongoose.Schema

const ActorSchema = new Schema({
    actorId:{
        type:Schema.ObjectId,
        unique:true,
        auto:true,
        index:true
    },
    name:{
        type:String,
        reuqired:true,
        max:[50,'name max len is 50 chars']
    },
    family:{
        type:String,
        reuqired:true,
        max:[50,'family max len is 50 chars']
    },
    nation:{
        type:String,
        max:[50,'nation max len is 50 chars']
    },
    actorMovies:[{
        type:Schema.ObjectId,
        ref:'actorMovies'
    }]
})

export default ActorSchema