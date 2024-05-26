
import AppError from '../utils/error.utils.js'
import jwt from 'jsonwebtoken'
const isLoggedIn = async (req,res,next)=>{
   try {
    const {token} = req.cookies
    console.log("COOKIES",req.cookies);
   console.log("TOKEN", token);
    if(!token){
        return next(new AppError("unauthenticated, please login",400))
    }

    const userDetails = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log("UserDetails", userDetails);
    req.user = userDetails
    next()
   } catch (error) {
      console.log("SOME ERROR OCCURED");
   }
}

export {
    isLoggedIn
}

