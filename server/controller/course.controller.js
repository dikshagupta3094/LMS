import CourseModel from '../models/course.model.js'
import AppError from '../utils/error.utils.js'
import mongoose from 'mongoose'
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses = async(req,res,next)=>{
 try {
    const courses = await CourseModel.find({}).select('-lectures')
    if(!courses){
        return next(new AppError('Course not found',400))
    }

    return res.status(200).json({
        success:true,
        message:"All courses fetched successfully",
        courses
    })
 } catch (error) {
    console.log(error);
    return next(new AppError(error.message,500))
 }
}

const getLecturesByCourseId = async(req,res,next)=>{
  try {
    const {id} = req.params
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid course ID', 400));
      }

    const course = await CourseModel.findById(id)
    if(!course){
        return next(new AppError('Didn`t find any lecture',400 ))
    }
      
    return res.status(200).json({
        success:true,
        message:"Lectures fetched succeesfully",
        lectures:course.lectures
    })
  } catch (error) {
    console.log(error);
     return next(new AppError(error.message,500))
  }
}

const createCourse = async(req,res,next)=>{
  
 try {
 const {title,description,category,createdBy} = req.body
  console.log("req.body",req.body);
  console.log("req.file", req.file);
 if( !title || !description || !category ||!createdBy){
  return next(new AppError('All fields are required',400))
 }

  const course = await CourseModel.create({
    title,
    description,
    category,
    createdBy,
    thumbnail:{
      public_id:'Dummy',
      secure_url:"Dummy"
  }
  })

  if(!course){
    return next(new AppError('Course could not be create'))
  }

  if(req.file){
   try {
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder:'LMS P',
      height:300,
      width:300
    })
    if(result){
      course.thumbnail.public_id = result.public_id
      course.thumbnail.secure_url = result.secure_url
    }
   } catch (error) {
     console.log(error)
   }
  }
  fs.rm(`uploads/${req.file.filename}`)
  await course.save()
  return res.status(200).json({
    success:true,
    message:"Course create successfully",
    course
  })
 } catch (error) {
   return next(new AppError(error.message,500))

 }
 
}

const removeCourse = async(req,res,next)=>{
  try {
    const {courseId} = req.params

   const course = await CourseModel.findByIdAndDelete(courseId)
   if(!course){
    return next(new AppError('Course not found with given Id',400))
   }

   return res.status(200).json({
    success:true,
    message:'Course removed Successfully',
    course
   })

  } catch (error) {
    return next(new AppError(error.message,500))
  }
}

const updateCourse = async(req,res,next)=>{
 try {
   const {courseId} = req.params
   const updateData = req.body
   const course = await CourseModel.findByIdAndUpdate(
    courseId,    
    updateData,
    {
        new: true,
        runValidators: true, // Ensure validators run on update
    }
   )
if(!course){
 return next(new AppError('Course with give id not found',400))
}
return res.status(200).json({
  success:true,
  message:'Course update successfully',
  course
})
 } catch (error) {
  console.log(error);
   return next(new AppError(error.message,500))
 }
}

const addLectureToCourseByGivenId = async(req,res,next)=>{
   try {
    const {id} = req.params
    const {title,description} = req.body
    const course = await CourseModel.findById(id)

    if(!course){
      return next(new AppError('Do not find any course related to this id',400))
    }

    if(!title || !description){
      return next(new AppError('All fields are required',400))
    }
   
    const lectureData = {
      title,
      description,
      lecture:{}
    }

    console.log("Lecture Data",lectureData);
  if(req.file){
    try {
     const result = await cloudinary.uploader.upload(req.file.path,{
       folder:'LMS P',
       height:300,
       width:300
     })
     if(result){
       lectureData.lecture.public_id = result.public_id
       lectureData.lecture.secure_url = result.secure_url
     }
    } catch (error) {
      console.log(error);
      return next(new AppError(error.message,400))
    }
   }
   //remove file from server
   fs.rm(`uploads/${req.file.filename}`)
   
   course.lectures.push(lectureData)
   course.numberofLecture = course.lectures.length

   await course.save()

   return res.status(200).json({
    success:true,
    message:"Lectures added to course",
    course
   })

   } catch (error) {
    console.log(error);
     return next(new AppError(error.message,500))
   }
}

const deleteLectureFromCourseByGivenId = async(req,res,next)=>{
   try {
    const {lectureId} = req.params;
   const lecture = await CourseModel.findByIdAndDelete(lectureId)

   if(!lecture){
    return next(new AppError('Given lecture id is invalid',400))
   }
   return res.status(200).json({
    success:true,
    message:'Lecture deleted successfully',
    lecture
   })
   } catch (error) {
     return next(new AppError(error.message,500))
   }
}
export{
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    removeCourse,
    updateCourse,
    addLectureToCourseByGivenId,
    deleteLectureFromCourseByGivenId
}

//6655b8367eb0f0a419fb741a