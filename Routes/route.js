const route=require("express").Router()

const controller = require("../Controller/action");

route.get("/accessories",controller.allproduct)
// route.get("/cart",controller.cart)
// route.post("/signup",controller.signup)
module.exports=route;