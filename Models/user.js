const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // _id:{
    //     type:ObjectId,
    //     required:true,
        
    // },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cart:[{
        type: ObjectId,
        ref: "Product"
    }]
}) 

const User = mongoose.model("User",userSchema);

module.exports = {User};