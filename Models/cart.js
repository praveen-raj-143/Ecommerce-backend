const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
});

const Cart = mongoose.model("cart",cartSchema);

module.exports = Cart;