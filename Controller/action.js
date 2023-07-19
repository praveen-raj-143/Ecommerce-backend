const {Product} = require("../Models/products")
const {User} =require("../Models/user")
// const Cart = require("../Models/cart")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "mysecretkey"


const allproduct = async (req,res)=>{
   const result= await Product.find()
   res.send(result)
   res.end()
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
       
       return res.json({status:"ok", data:token, userId:user._id})
   }else{
       return res.json({status:"error"})
   }
   
}
const userdetails= async (req,res)=>{
    const {token}=req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err,res)=>{
            if(err){
                return "token expired";
            }
            return res;
        });
        if(user=="token expires"){
            return res.json({status: "error", data:"token expired"})
        }
        const useremail = user.email;
        User.findOne({email: useremail}).populate("cart")
        .then((data)=>{
            res.send({status: "ok", data: data});
        })
        .catch((error)=>{
            res.send(error);
        })
    } catch (error) {
        
    }
}


const addtocart = async (req,res)=>{
    console.log(req.body, "78")
    // const update= await User.updateOne({_id : req.body.userId},{$addToSet:{cart:req.body.productId}})
    // if(update){
    //     return res.json({status:"ok"})
    // }else{
    //     return res.json({status:"error"})
    // }
    return res.send("add")
}



module.exports = {allproduct,signup,login,userdetails,addtocart}