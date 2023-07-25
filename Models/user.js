const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        quantity:Number,
        default:1,
        ref: "Product"
    }]
}) 

const User = mongoose.model("User",userSchema);

module.exports = {User};