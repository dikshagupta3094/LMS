import {Router} from 'express'
import { buySubscription, cancelSubscription, getAllpayement, getRazorpayApiKey, verifySubscription } from '../controller/payement.controller'
import { authorizedRoles, isLoggedIn } from '../middleware/auth.middleware'

const payementRoute = Router()

payementRoute.get('/razorpay-key', isLoggedIn, getRazorpayApiKey)
payementRoute.post('/buySubscription',isLoggedIn,buySubscription)
payementRoute.post('/verify',isLoggedIn,verifySubscription)
payementRoute.post('/unsubscribe',isLoggedIn,cancelSubscription)
payementRoute.get('/',isLoggedIn, authorizedRoles('Admin') ,getAllpayement)

export default payementRoute