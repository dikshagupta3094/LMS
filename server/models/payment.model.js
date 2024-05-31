import {model,Schema} from 'mongoose'

const payementSchema = new Schema({
    razorpaye_payement_id:{
        type:String,
        required:true
    },
    razorpaye_Subscription_id:{
        type:String,
        required:true
    },
    razorpayeSignature_id:{
        type:String,
        required:true
    }
},{timestamps:true})

const Payement = model('Payment',payementSchema)

export default Payement