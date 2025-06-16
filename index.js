const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const PORT=2000;

const app=express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to DB"))
.catch((e)=>console.log(e.message))


app.listen(PORT,()=>{
    console.log(`Server is Running ${PORT}`)
})