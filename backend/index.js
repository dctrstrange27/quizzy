const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const colors = require('colors')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,        
   optionSuccessStatus:200,
}

const port = process.env.PORT || 6000;
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

connectDB()

app.use('/api', require('./routes/user'))
 
try {
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.log(error)
}



