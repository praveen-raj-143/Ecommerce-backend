const express=require("express");
const Router=require("./Routes/route")
const app = express();
const connection = require("./Database/connection")
app.use(express.json())
const cors=require("cors")
app.use(cors({
    origin:"*"
}))
app.use(Router)

const PORT=5245;

app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
})