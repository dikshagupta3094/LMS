import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import toast from "react-hot-toast";
import { isemail } from "../Helpers/isregexMatch";
import axiosInstance from "../Helpers/axiosInstance";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("Fill all the fields");
      return;
    }

    if (!isemail(userInput.email)) {
      toast.error("Please provide valid email");
      return;
    }

    try {
      const res = axiosInstance.post("/contact", async() => {
        toast.promise(res, {
          loading: "Submitting your form",
          success: "Form submitted successfully",
          error: "Failed to submit your form",
        });
        const contactResponse = await res;
           
        if(contactResponse?.data?.success){
           setUserInput({
            name: "",
            email: "",
            message: "",
           })
        }
      });
    } catch (error) {
      toast.error("Failed to submit the form");
    }
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text shadow-[0_0_12px_black] w-[22rem]"
          onSubmit={onFormSubmit}
          noValidate
        >
          <h1 className="text-3xl font-semibold">Contact form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent px-2 py-1 border rounded-sm"
              id="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handelChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="email"
              className="bg-transparent px-2 py-1 border rounded-sm"
              id="email"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={handelChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent px-2 py-1 border rounded-sm resize-none h-40"
              id="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handelChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white rounded-sm transition-all ease-in-out duration-300 py-2 m-1 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
