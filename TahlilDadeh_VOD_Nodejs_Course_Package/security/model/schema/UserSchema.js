import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name:{type:String,max:50,require:true},
    family:{type:String,max:50,require:true},
    profileImageUrl:{type:String,max:2000},
    email:{type:String,max:500},
    mobile:{type:String,max:20,require:true},
    gender:{type:Boolean,default:false},
    birthDay:String,
    isAdmin:{type:Boolean,default:false},
    username:{type:String,min:2,max:100,require:true},
    hash:{type:String,require:true},
    salt:{type:String,require:true}

})

const users = mongoose.model('users',UserSchema)

export const userDB = {users,UserSchema}