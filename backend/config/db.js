const { mongoose } = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log('Monggo DB Database successfully Connectd'.cyan)
    } catch (error) {
        console.log(error) 
        process.exit(1)  
    }
}
module.exports = connectDB