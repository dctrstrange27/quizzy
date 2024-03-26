import express, { Express, Request, Response } from "express";
require('dotenv').config()
import connectDB from './config/db';
import cors from 'cors';
import userRoutes from './routes/user'; 
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

app.use('/api', userRoutes)

try {
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.log(error)
}



