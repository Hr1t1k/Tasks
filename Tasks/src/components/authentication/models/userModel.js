import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    googleId:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    lists:[listSchema]
});

module.exports = mongoose.model('User', userSchema);

