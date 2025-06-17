const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const PORT=2000;

const app=express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//import routes
const authRoutes=require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to DB"))
.catch((e)=>console.log(e.message))

app.use("/api/auth",authRoutes)
app.use("/api/questions", questionRoutes);

app.listen(PORT,()=>{
    console.log(`Server is Running ${PORT}`)
})