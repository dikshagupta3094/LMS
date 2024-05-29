import {Schema, model } from "mongoose";

const courseSchema = new  Schema({
    title:{
        type:String,
        minLength:[5,'Title should be of five character'],
        maxLength:[50,'Title should not be more than 50 character'],
        required:true,
        trim:true
    },
    description:{
        type:String,
        minLength:[20,'Description must be 20 character'],
        required:true
    },
    category:{
        type:String,
        required:[true,"Category must be defined"]
    },
    thumbnail:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    lectures:[
        {
            title: String,
            description: String,
            lecture: {
              public_id: {
                type: String,
                required: true,
              },
              secure_url: {
                type: String,
                required: true,
              },
            },
          },
    ],
    numberofLecture:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:[true,'Course instructor name must be defined']
    }
},{timestamps:true})

const Course = model('Course',courseSchema)

export default Course