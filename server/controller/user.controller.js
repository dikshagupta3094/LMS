import AppError from '../utils/error.utils.js'
import userModel from '../models/user.models.js'
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
const cookieOptions = {
    maxAge:7*60*60*1000, //7days
    httpOnly:true,
    secure:false
}
//  register controller

const register = async(req,res,next)=>{
const {fullName,email,password} = req.body;

//checking all fields 
if(!fullName || !email || !password){
    return next(AppError('All fields are required',400))
}
// if user already exist
const userExist = await userModel.findOne({
    email})
if(userExist){
    return next(AppError('user already exist',400))
}
// creating new user
const user = await userModel.create({
    fullName,
    email,
    password,
    avatar:{
        public_id:email,
        secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
    }
})

if(!user){
    return next(AppError("User registration failed, Please try again",400))
}
//TODO : upload file
console.log(req.file);
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
      user.avatar.public_id = result.public_id,
      user.avatar.secure_url = result.secure_url
    }
    //Remove file from server
    fs.rm(`uploads/${req.file.filename}`)
  } catch (error) {
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

const forgotPassword = async(req,res)=>{
     const {email} = req.body
     const user = await userModel.findOne({email})
    if(!user){
      return next(AppError('We do not find any user with given email!! Email not found',400))
    }

    const resetToken = user.generatePasswordResetToken() 
    console.log(resetToken);
    await user.save({ValiditBeforSave:false})
}
export{
    register,
    login,
    logout,
    myProfile,
    forgotPassword
}