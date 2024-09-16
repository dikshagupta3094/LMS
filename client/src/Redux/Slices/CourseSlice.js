import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courseRoute");
    toast.promise(response, {
      loading: "Fetching all courses",
      success: "Course fetched successfully",
      error: "Failed to fetch courses",
    });

    //return courses here
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("description", data?.description);
      formData.append("thumbnail", data?.thumbnail);
      const response = axiosInstance.post(
        "courseRoute/createCourse",
        formData
      );
      toast.promise(response, {
        loading: "creating course",
        success: "Course created successfully",
        error: "Failed to create courses",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("Course Details", action.payload);
        //we return action.payload here as we already return courses
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
