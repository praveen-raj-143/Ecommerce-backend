const {Product} = require("../Models/products")
const {User} =require("../Models/user")
const {Cart} = require("../Models/cart")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "mysecretkey"


const allproduct = async (req,res)=>{
   const result= await Product.find()
   res.send(result)
}


const signup = async (req,res)=>{
    const {username,email,password} = req.body;
    
    
    try{
        const olduser = await User.findOne({email});
        if(olduser){
          return  res.json({status:"olduser"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        
        const userobj = new User({
            username,
            
            email,
            password: hashpassword
        })
        
         await userobj.save();

        return res.json({status:"ok"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send("invalid details")
    }
}

const login = async (req,res)=>{
   const {email,password}=req.body;
   const user = await User.findOne({email});
   if(!user){
       return res.json({status:"error"})
   }
   const checkpassword = await bcrypt.compare(password, user.password);
   if(checkpassword){
       const token = jwt.sign({email: user.email},JWT_SECRET, {
           expiresIn:'1d',
       })
       
       return res.json({status:"ok", data:token})
   }else{
       return res.json({status:"error"})
   }
   
}

const addtocart = async (req,res)=>{
    console.log("Add Items req.BOdy.Data",req.body.Data);
    const {userID,productID,quantity} = req.body.Data;
    
    try {

        const user = await UsersModel.findById(userID);
        console.log("user =>",user);
        let cart = await CartModel.findOne({userId:user._id});
        let product = await Product.findById(productID)
        console.log("cart =>",cart);
        if(cart){
            let itemIndex = cart.products.findIndex((ele)=>{
                if(ele){
                   return ele._id == productID
                }else
                    return false

            });
            console.log("itemIndex==>",itemIndex);
            if(itemIndex > -1){
                let productQuantity = cart.products[itemIndex];   // will return object product[{},{},{}]
                productQuantity.quantity = quantity;
                cart.products[itemIndex] = productQuantity;       // assigned updated Product obj
            }else{
                cart.products.push(product);
            }
            cart = await cart.save();
            res.status(200).json({
                status:"success",
                cart:cart
            });
        }else{
            console.log("user._id==>",user._id);
            console.log("{productID,quantity,price}==>",{productID,quantity});
            // const nCart = await CartModel.create({
            //     userId:user._id,
            //     products:[{productID,quantity,price}]
            // });
            const nCart = await new CartModel({
                userId:user._id,
                products:[{...product,quantity:quantity}]
            })

            const response =await nCart.save();
            return res.status(201).json({response});
        }
    } catch (error) {
        console.log("error in add Items",error);
        res.status(400).json({
            status:"Fail",
            error:error
        });
    }
}

const showcart= async (req,res)=>{
    const cartItems = [];
    const {userID} = req.body.Data;
    console.log("Show carts req.body.Data =>",req.body.Data);
    try {
        const user = await UsersModel.findById(userID);
        console.log("Show cart user =>",user);
        let cart = await CartModel.findOne({userId:user._id});
        console.log("show cart's cart =>",cart);
        cart.products.map((product)=>{
            if(product!==null)
                cartItems.push(product);
        });
        
        res.status(200).json({
            cartItems
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:"Fail",
            error:error
        });
    }
}

module.exports = {allproduct,signup,login,addtocart,showcart}