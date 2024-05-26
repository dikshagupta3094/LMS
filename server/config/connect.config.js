import mongoose from "mongoose";

mongoose.set('strictQuery',false)
const DB_URL = process.env.DB_URI || 'mongodb://127.0.0.1/LMSProject'
const connectionToDb = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${DB_URL}`)
        console.log(`Connected to mongoDB ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection failed',error);
        process.exit(1)
    }
}

export default connectionToDb