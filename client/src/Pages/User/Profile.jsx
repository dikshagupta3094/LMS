import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout";
import { Link } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state?.authReducer?.data);
  const dispatch = useDispatch();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 w-96 text-white  shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 rounded-full m-auto border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email: </p>
            <p>{userData?.email}</p>

            <p>Role: </p>
            <p>{userData?.role}</p>

            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500  text-center py-2 px-1 transition-all ease-in-out rounded-md font-semibold text-lg "
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500  text-center py-2 px-1 transition-all ease-in-out rounded-md font-semibold text-lg "
            >
              <button>Edit profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <div className="text-center text-lg font-semibold bg-red-600 hover:bg-red-500 transition-all ease-in-out px-1 py-2 rounded-lg">
              <button>Cancel Subscription</button>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
