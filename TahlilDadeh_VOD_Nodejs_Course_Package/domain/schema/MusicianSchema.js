import mongoose from "mongoose";

const Schema = mongoose.Schema

const MusicianSchema = new Schema({
    musicianId:{
        type:Schema.ObjectId,
        unique:true,
        auto:true,
        index:true
    },
    name:{
        type:String,
        required:[true,'director name is required'],
        max:[50,'max len is 50 chars']
    },
    family:{
        type:String,
        required:[true,'director name is required'],
        max:[50,'max len is 50 chars']
    },
    nation:{
        type:String,
        max:[50,'nation max is 50 chars']
    },
    movies:[{
        type:Schema.ObjectId,
        ref:'movies'
    }]
})

export default MusicianSchema