const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        requried:true
    },
    quantity:{
        type:Number,
        default:1
    }
});

const Cart = mongoose.model("cart",cartSchema);

module.exports = {Cart};