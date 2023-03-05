const { json } = require('body-parser');
const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/middleware')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const port = process.env.PORT || 6000;


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
connectDB()

app.use('/api', require('./routes/user'))
//app.use('/api/newUser', require('./routes/user'))
// app.use('/api/food', require('./routes/foodRoutes'))
// app.post('/api/food',(req,res)=>{res.status(200).json({message:"set Food"})})
//app.use(errorHandler) @  

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})



