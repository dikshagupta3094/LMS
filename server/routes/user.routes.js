import express from "express";

const userRoute = express.Router();
import { register,login,logout,myProfile,forgotPassword } from "../controller/user.controller.js";
import {isLoggedIn} from '../middleware/auth.middleware.js'

import upload from '../middleware/multer.middleware.js'
userRoute.post('/register', upload.single('avatar') ,register)
userRoute.post('/login',login)
userRoute.get('/logout',logout)
userRoute.get('/myprofile',[isLoggedIn],myProfile)
userRoute.post('/forgotPassword',forgotPassword)



export default userRoute;