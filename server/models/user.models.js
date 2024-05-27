import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,'Name is required'],
        lowercase:true,
        trim:true,
        maxLength:[50,'Name is not more than 50 words']
    },

    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:[true,'email is required'],
        unique:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Email should in valid format']
    },

    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[8,'Password must be 8 character long'],
        trim:true,
        select:false
    },

    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },

    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    },
    subscription:{
        type:String,
        status:String
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date

},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    try {
        console.log("Hashing password for:", this.email); 
        this.password = await bcrypt.hash(this.password,10)
        next();
    } catch (error) {
        return next(error)
    }
   
});

userSchema.methods = {
    generateJWTtoken: function(){
        return jwt.sign({
            id:this._id,
            email:this.email,
            subscription:this.subscription
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:'24h'}
        )
    },
// this method will compare plain password with hashed password and return either true or false
    comparePassword: async function(plainTextpassword){
       try {
        console.log("plain password",plainTextpassword);
        console.log('Hased password', this.password)
        const result =  await bcrypt.compare(plainTextpassword,this.password)
        console.log("Result",result)
        return result
       } catch (error) {
        console.log(error);
         throw error
       }
    },

    // this method will generate reset token 
    generatePasswordResetToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex')
        console.log("Model", resetToken);
        //Generate reset psaaword token and store it in database
        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
      
        this.forgotPasswordExpiry = Date.now()+ 15*60*1000 // 15 min from now 
        
        return resetToken
       
    }
}

const User = new model('User',userSchema)

export default User