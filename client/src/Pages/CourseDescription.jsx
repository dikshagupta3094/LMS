import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription() {
  let { state } = useLocation();
  const { role, data } = useSelector((state) => state.authReducer);
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5 ">
            <img
              src={state.thumbnail.secure_url}
              alt="Image"
              className="w-full h-64"
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Total lectures :{" "}
                  </span>
                  {state.numberofLecture}
                </p>
                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{" "}
                  </span>
                  {state.createdBy}
                </p>
              </div>
              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button className="w-full bg-yellow-600 px-4 py-1 text-xl font-semibold rounded">
                  Watch Lectures
                </button>
              ) : (
                <button className="w-full bg-yellow-600 px-4 py-1 text-xl font-semibold rounded">
                  Subscribe
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xl">
           <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">{state.title}</h1>
           <p className="text-yellow-500">Course Description:</p>
           <p>{state.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
