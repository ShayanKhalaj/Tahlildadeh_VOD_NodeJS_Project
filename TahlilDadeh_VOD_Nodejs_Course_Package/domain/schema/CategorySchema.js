import mongoose from "mongoose";

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryId:{
        type:Schema.ObjectId,
        auto:true,
        index:true,
        unique:true
    },
    categoryName:{
        type:String,
        required:[true,"category name is required"],
        max:[50,'max len is 50 chars']
    },
    description:{
        type:String,
        max:[200,'max len is 200 chars']
    },
    categoryImageUrl:{
        type:String,
        max:[2000,'max len is 2000 chars']
    },
    categoryImageAlter:{
        type:String,
        max:[200,'max len is 200 chars']
    },
    // movies:[{
    //     movieId:Schema.ObjectId
    // }],
    movies:[Schema.ObjectId]
})

export default CategorySchema