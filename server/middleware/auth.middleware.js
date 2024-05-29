
import AppError from '../utils/error.utils.js'
import jwt from 'jsonwebtoken'
const isLoggedIn = async (req,res,next)=>{
   try {
    const {token} = req.cookies
    // console.log("COOKIES",req.cookies);
    // console.log("TOKEN", token);
    if(!token){
        return next(new AppError("unauthenticated, please login",400))
    }

    const userDetails = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    // console.log("UserDetails", userDetails);
    req.user = userDetails
    next()
   } catch (error) {
      console.log("SOME ERROR OCCURED");
   }
}

 const authorizedRoles = (...roles)=>async(req,res,next)=>{
     const currentUserRole = req.user.role
     if(!roles.includes(currentUserRole)){
          return next(new AppError('You don`t have permission to access this',400))
     }
     next()
 }

export {
    isLoggedIn,
    authorizedRoles
}

