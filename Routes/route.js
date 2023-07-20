const route=require("express").Router()

const controller = require("../Controller/action");

route.get("/accessories",controller.allproduct)
route.post("/cart",controller.addtocart)
route.post("/profile",controller.userdetails)
route.post("/delete",controller.deleteproduct)
route.post("/update",controller.updatecart)
route.post("/signup",controller.signup)
route.post("/signin",controller.login)
module.exports=route;