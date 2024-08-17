import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'
import courseReducer from './Slices/CourseSlice'

 const store = configureStore({
    reducer:{
      authReducer,
      courseReducer
   },
    devTools:true
 })

 export default store