import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

 function Signup() {
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserData(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setSignupData({
        ...signupData,
        avatar: uploadImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        // console.log(this.result);
        setPreviewImage(this.result);
      });
    }
  }

  async function createUserAccount(e) {
    e.preventDefault();

    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    //chencking name length

    if (signupData.fullName.length < 5) {
      toast.error("Name should be more than 5 character");
      return;
    }
    //checking valid email

    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email");
      return;
    }

    //password validation
    if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
      toast.error('Password should be 8 characters long and have atleast one special character')
      return;
    }

    const formData = new FormData();
    formData.append('fullName',signupData.fullName);
    formData.append('email',signupData.email);
    formData.append('password',signupData.password);
    formData.append('avatar',signupData.avatar);

    //dispatch create account action
    const response = await dispatch(createAccount(formData))
    console.log(response);

    if(response?.payload?.success)
       navigate('/');
   
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    })

    setPreviewImage("");
  }


  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createUserAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            id="image_uploads"
            className="hidden"
            name="image_uploads"
            accept=".jpg, .jpeg, .svg, .png"
          />

          <div className="flex flex-col gap-1">
            {/* Name */}
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              type="name"
              required
              placeholder="Enter you Name.."
              name="fullName"
              id="fullName"
              value={setSignupData.fullName}
              onChange={handleUserData}
              className="bg-transparent px-2 py-1 border rounded-sm"
            />

            {/* Email */}
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter you email.."
              name="email"
              id="email"
              value={setSignupData.email}
              onChange={handleUserData}
              className="bg-transparent px-2 py-1 border rounded-sm"
            />

            {/* Password */}
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter you password.."
              name="password"
              id="password"
              value={setSignupData.password}
              onChange={handleUserData}
              className="bg-transparent px-2 py-1 border rounded-sm"
            />
          </div>

          <button
            className="bg-yellow-600 w-full px-2 py-2 font-semibold text-lg cursor-pointer rounded-sm mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-accent link">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
