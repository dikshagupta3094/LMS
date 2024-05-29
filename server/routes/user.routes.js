import express from "express";

const userRoute = express.Router();
import { register,login,logout,myProfile,forgotPassword,resetPassword,changePassword,updateProfile } from "../controller/user.controller.js";
import {isLoggedIn} from '../middleware/auth.middleware.js'

import upload from '../middleware/multer.middleware.js'
userRoute.post('/register', upload.single('avatar') ,register)
userRoute.post('/login',login)
userRoute.get('/logout',logout)
userRoute.get('/myprofile',isLoggedIn, myProfile)
userRoute.post('/forgotPassword',forgotPassword)
userRoute.post('/resetPassword/:resetToken',resetPassword)
userRoute.post('/changePassword',isLoggedIn, changePassword)
userRoute.put('/updateProfile',isLoggedIn, upload.single('avatar'),updateProfile)




export default userRoute;