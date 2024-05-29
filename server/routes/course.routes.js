import { Router } from "express";

const courseRoute = Router()

import {getAllCourses,getLecturesByCourseId,createCourse,removeCourse,updateCourse,addLectureToCourseByGivenId,deleteLectureFromCourseByGivenId} from '../controller/course.controller.js'
import upload from "../middleware/multer.middleware.js";
import { isLoggedIn,authorizedRoles } from "../middleware/auth.middleware.js";
courseRoute.get('/',getAllCourses)
courseRoute.post('/createCourse',isLoggedIn,authorizedRoles('Admin'),upload.single('thumbnail'),createCourse)
courseRoute.get('/:id', isLoggedIn,authorizedRoles('Admin'), getLecturesByCourseId)
courseRoute.delete('/removeCourse/:courseId',isLoggedIn,authorizedRoles('Admin'),removeCourse)
courseRoute.put('/updateCourse/:courseId',isLoggedIn,authorizedRoles('Admin'),updateCourse)
courseRoute.post('/addLectureToCourseByGivenId/:id',isLoggedIn,authorizedRoles('Admin'),upload.single('lecture'), addLectureToCourseByGivenId)
courseRoute.delete('/deleteLectureFromCourseByGivenId/:lectureId',isLoggedIn,authorizedRoles('Admin'),deleteLectureFromCourseByGivenId)

export default courseRoute
