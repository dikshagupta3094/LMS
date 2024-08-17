import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../Redux/Slices/CourseSlice";
import HomeLayout from "../Layout/HomeLayout";
import CourseCard from "../Component/CourseCard";
function CourseList() {
  const dispatch = useDispatch();
  const {courseData} = useSelector((state) => state.courseReducer);
  
 async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(()=>{
    loadCourses()
  },[])
  return(
    <HomeLayout>
         <div className="min-h[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
            <h1 className="text-center text-3xl ">Explore Courses made by <span className="font-bold text-yellow-500">Industry Expert</span>
            <div className="mb-10 flex flex-wrap gap-14 mt-8">
                {courseData?.map((element)=>{  
                    return <CourseCard key={element._id} data={element}/>
                })}
            </div>
            </h1>
         </div>
    </HomeLayout>
  );
}

export default CourseList;
