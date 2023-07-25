const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    catagory:{
        type:String,
        required:true,
    },
    ratting:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        unique:true
    },
    oprice:{
        type:Number,
        required:true,
    },
    quantity:Number,
        default:1,
}) 

const Product = mongoose.model("Product",productSchema);

module.exports = {Product};