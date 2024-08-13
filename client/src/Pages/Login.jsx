import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

 function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleLoginData(e) {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  }



  async function onLogin(e) {
    e.preventDefault();

    if (
      !LoginData.email ||
      !LoginData.password 
    ) {
      toast.error("Please fill all the fields");
      return;
    }


    //dispatch login action
    const response = await dispatch(login(LoginData))
    console.log(response);

    if(response?.payload?.success)
       navigate('/');
   
    setLoginData({
      email: "",
      password: "",
    })
  }


  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          <div className="flex flex-col gap-1">
           
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
              value={setLoginData.email}
              onChange={handleLoginData}
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
              value={setLoginData.password}
              onChange={handleLoginData}
              className="bg-transparent px-2 py-1 border rounded-sm"
            />
          </div>

          <button
            className="bg-yellow-600 w-full px-2 py-2 font-semibold text-lg cursor-pointer rounded-sm mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-accent link">
              sign up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
