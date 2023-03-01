const { json } = require('body-parser');
const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const colors = require('colors')
// const {errorHandler} = require('./middleware/errorHandler')

const port = process.env.PORT;


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()

// app.use('/api/food', require('./routes/foodRoutes'))
// app.use('/api/admin', require('./routes/adminRoutes'))
// app.post('/api/food',(req,res)=>{res.status(200).json({message:"set Food"})})
// app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

