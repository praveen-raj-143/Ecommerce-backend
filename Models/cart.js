// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     product:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Product",
//         requried:true
//     },
//     quantity:{
//         type:Number,
//         default:1
//     }
// });

// const Cart = mongoose.model("cart",cartSchema);

// module.exports = {Cart};

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;