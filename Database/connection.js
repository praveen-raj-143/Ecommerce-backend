const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);


const findall = async () => {
    const database = client.db("Ecommerce");
    const collection = database.collection("store");
    await client.connect();
    const dbResponse = await collection.find().toArray();
    await client.close();
    return dbResponse; 
}
const cart = async () => {
    const database = client.db("Ecommerce");
    const collection = database.collection("cartstore");
    await client.connect();
    const dbResponse = await collection.find().toArray();
    await client.close();
    return dbResponse; 
}
// const signup = async ()=>{
//     const database = client.db("Ecommerce");
//     const collection = database.collection("user");
//     await client.connect();
//     const dbResponse = await collection.find().toArray();
//     await client.close();
//     return dbResponse;
// }

const signup = async(req,res)=>{
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
}

module.exports = {findall,cart,signup}