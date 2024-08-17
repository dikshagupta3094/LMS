import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"


const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk('/course/get',async()=>{
    try {
        const response = axiosInstance.get('/courseRoute')
        toast.promise(response,{
            loading:'Fetching all courses',
            success:'Course fetched successfully',
            error:'Failed to fetch courses'
        })

        //return courses here
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                console.log("Course Details",action.payload); 
                //we return action.payload here as we already return courses
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer