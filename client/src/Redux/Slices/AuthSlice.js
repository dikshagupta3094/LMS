import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance'
const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isloggedIn")) || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
     const res = axiosInstance.post('userRoute/signup',data);
     toast.promise(res,{
        loading:'Wait, creating your account',
        success:(data)=>{
            return data?.data?.message
        },
        error:'Failed to create account'
     })
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
     const res = axiosInstance.post('userRoute/login',data);
     
     toast.promise(res,{
        loading:'Wait, While Login',
        success:(data)=>{
            return data?.data?.message
        },
        error:'Failed to Login'
     }) 
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
     const res = axiosInstance.get('userRoute/logout');
     console.log(res);
     
     toast.promise(res,{
        loading:'Wait, Logout in Progress',
        success:(data)=>{
            return data?.data?.message
        },
        error:'Failed to Logout'
     })
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(login.fulfilled,(state,action)=>{
         localStorage.setItem("data",JSON.stringify(action?.payload?.user))
         localStorage.setItem("isLoggedIn",true)
         localStorage.setItem("role",action?.payload?.user?.role)
         state.isLoggedIn = true;
         state.data = action?.payload?.user;
         state.role = action?.payload?.user?.role;
    })
    .addCase(logout.fulfilled,(state)=>{
      localStorage.clear();
      state.isLoggedIn = false
      state.data = {}
      state.role = ""

    })
  }
});

export const {} = authSlice.actions;

export default authSlice.reducer;
