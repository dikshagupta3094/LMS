import { Model,Mongoose,Schema } from "mongoose";

const courseSchema = new  Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    category:{
        type:String
    }
},{timestamps:true})