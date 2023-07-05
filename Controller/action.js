const mongoClient = require("../Database/connection");

const findall = async (req, res) => {
    try {
        const result = await mongoClient.findall();
        return res.status(200).send(result);
    } catch(error) {
        console.log("Something went wrong while performing database opeartion");
        return res.status(500).send({message: "Something went wrong while performing the operation"})
    }
}
const cart = async (req, res) => {
    try {
        const result = await mongoClient.cart();
        return res.status(200).send(result);
    } catch(error) {
        console.log("Something went wrong while performing database opeartion");
        return res.status(500).send({message: "Something went wrong while performing the operation"})
    }
}
const signup = async(req,res)=>{
    try {
        const result = await mongoClient.signup();
        return res.status(200).send(result);
    } catch(error) {
        console.log("Something went wrong while performing database opeartion");
        return res.status(500).send({message: "Something went wrong while performing the operation"})
    }
    // const {email,password}=req.body;
    // const isExist= await client.db("Ecommerce").collection("user").findOne({email});
    // if(isExist){
    //     res.send({"msg":"email is already exist"})
    //     return;
    // }
    // const salt=await bcrypt.genSalt(10);
    // const hashpassword= await bcrypt.hash(password,salt)
    // const newuser={
    //     "email":email,
    //     "password":hashpassword
    // }
    // await client
    // .db("ecommerce")
    // .collection("user")
    // .insertOne(newuser)
    // res.send({"msg":"signed up successfully"})
}

module.exports = {findall,cart,signup}