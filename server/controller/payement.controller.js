import AppError from "../utils/error.utils"
import UserModel from '../models/user.models.js'
import razorpay from 'razorpay'
import subscriptions from "razorpay/dist/types/subscriptions.js"

const getRazorpayApiKey = async(req,res,next)=>{
  try {
    res.status(200).json({
        success:true,
        message:'RazorPay key id',
        key:process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
     return next(new AppError(error.message,500))
  }
}

const buySubscription = async(req,res,next)=>{
   try {
    const {id} = req.user;
    const user = await UserModel.findById(id)
    if(!user){
        return next(new AppError('User not found, Please login again',400))
    }
    
    if(user.role === 'Admin'){
        return next(new AppError('Admin Can not purchase Subscription'))
    }
   
    const subscription = await razorpay.subscriptions.create({
        plan_id:process.env.RAZORPAY_PLAIN_ID,
        customer_notify:1
    })

    user.subscription.id = subscription.id
    user.subscription.status = subscription.status

    await user.save()
   
    return res.status(200).json({
        success:true,
        message:'Subscribed Successfully',
        subscription_id:subscription.id
    })
   } catch (error) {
     return next(new AppError(error.message,500))
   }
}

const verifySubscription =async(req,res,next)=>{
    const {id} = req.params
    const {razorpay_subscription_id, razorpay_payement_id,razorpay_signature} = req.body
     const user = await UserModel.findById(id)

     if(!user){
        return next(new AppError('User not found',400))
     }

     
}

const cancelSubscription = async(req,res,next)=>{
    
}

const getAllpayement = async(req,res,next)=>{

}

export{
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    getAllpayement
}