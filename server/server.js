
import {config} from 'dotenv'
config()
 import app from './app.js'
 import connectionToDb from './config/connect.config.js'
 import {v2 as cloudinary} from 'cloudinary';

 const port = process.env.PORT ||5000


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET 
    });
    console.log("Cloudainary config",process.env.API_KEY );
app.listen(port,async()=>{
    await connectionToDb()
    console.log(`Server is listening on port ${port}`);
})