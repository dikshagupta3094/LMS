import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'

 const store = configureStore({
    reducer:{authReducer},
    devTools:true
 })

 export default store