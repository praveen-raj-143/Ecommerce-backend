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
        type:String,
        required:true,
        unique:true
    },
    oprice:{
        type:String,
        required:true,
    }
}) 

const Product = mongoose.model("Product",productSchema);

module.exports = {Product};