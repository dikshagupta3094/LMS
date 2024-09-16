import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createNewCourse } from "../Redux/Slices/CourseSlice";
import HomeLayout from "../Layout/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uplodedImage = e.target.files[0];
    if (uplodedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uplodedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uplodedImage,
        });
      });
    }
  }
  function handelUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.thumbnail ||
      !userInput.category
    ) {
      toast.error("All fields are mandatary");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    //  console.log("Course",response?.payload?.success);

    if (response?.payload?.success) {
      userInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
    }
    navigate("/courses");
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center p-4 w-[700px] my-10 text-white rounded-lg shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center rounded border mt-2">
                      <p className="font-bold text-lg">
                        Upload your course thumbnail
                      </p>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg mt-2">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border font-semibold"
                  value={userInput.tittle}
                  onChange={handelUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg mt-2 ">
                  Created By
                </label>
                <input
                  required
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  placeholder="Enter course instructor"
                  className="bg-transparent px-2 py-1 border font-semibold"
                  value={userInput.createdBy}
                  onChange={handelUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg mt-2 ">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter Course Category"
                  className="bg-transparent px-2 py-1 border font-semibold"
                  value={userInput.category}
                  onChange={handelUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg mt-2 ">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter Course Category"
                  className="bg-transparent px-2 h-24 py-1 border overflow-y-scroll resize-none font-semibold"
                  value={userInput.description}
                  onChange={handelUserInput}
                />
              </div>
            </div>
          </main>

          <button
            onClick={onFormSubmit}
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-100 m-2 px-2 py-1 font-semibold rounded-sm text-lg"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
