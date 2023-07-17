const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
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
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
});

const Cart = mongoose.model("cart",cartSchema);

module.exports = Cart;