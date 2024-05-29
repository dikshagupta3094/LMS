import AppError from '../utils/error.utils.js'
import userModel from '../models/user.models.js'
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
const cookieOptions = {
    maxAge:7*60*60*1000, //7days
    httpOnly:true,
    secure:false
}
//  register controller

const register = async(req,res,next)=>{
const {fullName,email,password,role} = req.body;

//checking all fields 
if(!fullName || !email || !password){
    return next(AppError('All fields are required',400))
}
// if user already exist
const userExist = await userModel.findOne({
    email})
if(userExist){
    return next(new AppError('user already exist',400))
}
// creating new user
const user = await userModel.create({
    fullName,
    email,
    password,
    role,
    avatar:{
        public_id:email,
        secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
    }
})

if(!user){
    return next(AppError("User registration failed, Please try again",400))
}
//TODO : upload file
console.log("File details",JSON.stringify(req.file));
if(req.file){
  try {
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder: 'LMS P',
      width:250,
      height:250,
      gravity:'faces',
      crop:'fill'
    })
    if(result){
      console.log("result.public_id",result.public_id);
      console.log("result.secure_url",result.secure_url)
      user.avatar.public_id = result.public_id,
      user.avatar.secure_url = result.secure_url
    }

    // Remove file from server
    fs.rm(`uploads/${req.file.filename}`)
  } catch (error) {
    console.log(error);
     return next(new AppError('File not upload succesfully',500))
  }
}
await user.save()

user.password = undefined

const token  = user.generateJWTtoken()

// set token in cookie with all cookie options with the name of token only
res.cookie('token',token,cookieOptions)
// if all ok then send response to the user
res.status(201).json({
    success:true,
    message:"Register successfully",
    user
})
}

//  login controller 
const login = async (req,res,next)=>{
  try {
    // taking email and password from body
    const {email,password} = req.body
    if(!email || !password){
      return next(AppError('All fields are required',400))
    }

    // find user from user model
    const user = await userModel.findOne({email}).select('+password')
   console.log("User",user);
  // checking if user provide same password or not 
  const isMatch = await user.comparePassword(password)
  console.log("Password", isMatch);
    if(!(user && isMatch)){
      return next(new AppError('Email or password does not match',401))
    }
    
    const token = user.generateJWTtoken()
    user.password = undefined
    console.log("GENERATE token", token);
    res.cookie('token',token,cookieOptions)
    res.status(200).json({
      success:true,
      message:"Logged successfully",
      token,
      user
    })
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message,500))
  }
}

//LOGOUT CONTROLLER
const logout = (req,res)=>{
  res.cookie('token',null,{
    secure:false,
    maxAge:0,
    httpOnly:true
  })
  res.status(200).json({
    success:true,
    message:"User logged out successfully"
  })
}

// MY PROFILE CONTROLLER
const myProfile = async (req,res,next)=>{
 try {
  const userId = req.user.id
 const user = await userModel.findById(userId)

 res.status(200).json({
    success:true,
    messgae:"profile get",
    user
 })
 } catch (error) {
   return next(new AppError('Failed to fetch detail',500))
 }
}

//Forgot password Controller 
const forgotPassword = async(req,res)=>{
     const {email} = req.body
     
     if(!email){
      return next(new AppError("Email is required",400))
     }
     //Find that given email id is registered or not
     const user = await userModel.findOne({email})
     //If user not found
    if(!user){
      return next(new AppError('We do not find any user with given email!! Email not found',400))
    }
    // If user found than generate a reset Token using Crypto module
    const resetToken = await user.generatePasswordResetToken() 
    await user.save()
    console.log("Reset Token",resetToken);
    const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`

    const message = `we have recived reset password request please click below link to reset your password \n ${resetURL} \n This link is valid only for 15 minutes`  
   console.log("Message>>",message);
    try {
      await sendEmail({
        email:user.email,
        subject:'Password change request recived',
        message
      })
      res.status(200).json({
        success:true,
        message:"Reset password link as been send"
        
      })
    } catch (error) {
      user.forgotPasswordToken = undefined,
      user.forgotPasswordExpiry = undefined,
      await user.save()
      console.log(error);
      return next(new AppError('There was an error for sending reset password link! PLEASE TRY AGAIN',500))
    }
}

//Reset Password controller
const resetPassword = async(req,res,next)=>{
  try {
    //extract token from params
   const {resetToken} = req.params
   const {password} = req.body

   //check password field is required
   if(!password){
    return next(new AppError('Password is required',400))
   }

     //Generate forgot password token
   const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await userModel.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry :{$gt:Date.now()}
   })
  
   if(!user){
      return next(new AppError('Token is invalid, or expired'),400)
   }

   user.password =await bcrypt.hash(password,10)
   user.forgotPasswordToken = undefined
   user.forgotPasswordExpiry = undefined
   user.passwordChangeAt = Date.now()
  await user.save()
   console.log(user);
   res.status(200).json({
      success:true,
      message:'Password reset successfully',
   })
   } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Some internall error occured"
    })
   }
}

const changePassword = async(req,res,next)=>{
 const {oldPassword,newPassword} = req.body
const {id} = req.user
 if(!oldPassword || !newPassword){
  return next(new AppError("All fields are mandatory",400))
 }
const user = await userModel.findById(id).select('+password')
if(!user){
  return next(new AppError('User not found',400))
}

const isMatch = await user.comparePassword(oldPassword)

if(!isMatch){
  return next(new AppError('Your old Password does not match',400))
}
 user.password = newPassword
 await user.save()
 user.password = undefined
 res.status(200).json({
  success:true,
  message:"Password updated successfully",
  user
 })
}

const updateProfile = async(req,res,next)=>{
   const {fullName} = req.body
   console.log("Body",fullName);
   const {id} = req.user

   const user = await userModel.findById(id)

   if(!user){
    return next(new AppError('User not exist',400))
   }

   if(fullName){
    user.fullName = fullName
    console.log("User",user.fullName);
   }
   if(req.file){
    await cloudinary.uploader.destroy(user.avatar.public_id)

    try {
      const result = await cloudinary.uploader.upload(req.file.path,{
        folder: 'LMS P',
        width:250,
        height:250,
        gravity:'faces',
        crop:'fill'
      })
      if(result){
        console.log("result.public_id",result.public_id);
        console.log("result.secure_url",result.secure_url)
        user.avatar.public_id = result.public_id,
        user.avatar.secure_url = result.secure_url
      }
  
      // Remove file from server
      fs.rm(`uploads/${req.file.filename}`)
    
    } catch (error) {
      console.log(error);
       return next(new AppError('File not upload succesfully',500))
    }
   
   }
   await user.save()
   res.status(200).json({
     success:true,
     message:"user details updated successfully",
    })
 
}

export{
    register,
    login,
    logout,
    myProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile
}