const {Product} = require("../Models/products")



const allproduct = async (req,res)=>{
   const result= await Product.find()
   res.send(result)
}

module.exports = {allproduct}