const express=require("express");
const Router=require("./Routes/route")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);
const app = express();
app.use(express.json())
const cors=require("cors")
app.use(cors({
    origin:"*"
}))
app.use(Router)

const PORT=5245;
app.post("/signup", async(req,res)=>{
    const {email,password}=req.body;
    const isExist= await client.db("ecommerce").collection("user").findOne({email});
    if(isExist){
        res.send({"msg":"email is already exist"})
        return;
    }
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(password,salt)
    const newuser={
        "email":email,
        "password":hashpassword
    }
    await client
    .db("ecommerce")
    .collection("user")
    .insertOne(newuser)
    res.send({"msg":"signed up successfully"})
})

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const isExist= await client.db("ecommerce").collection("user").findOne({email})
    if(!isExist){
        res.send({"msg":"user doesnot exist"})
    }
    const passwordCheck=bcrypt.compare(password,isExist.hashpassword);
    if(!passwordCheck){
        res.send({"msg":"credentials invalid"})
    }
    const token=jwt.sign(isExist,"MYSECRATE")
    res.send({"msg":"login successfull",token})
})
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})