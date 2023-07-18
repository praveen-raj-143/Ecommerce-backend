const route=require("express").Router()

const controller = require("../Controller/action");

route.get("/accessories",controller.allproduct)
route.post("/cart",controller.addtocart)
route.post("/profile",controller.userdetails)
route.post("/showcart",controller.showcart)
route.post("/signup",controller.signup)
route.post("/signin",controller.login)
module.exports=route;