import React from "react";
import { FiMenu } from "react-icons/fi";
import { GoXCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check user is loggedIn or not

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  //for displaying the options action role

  const role = useSelector((state) => state?.auth?.role);
  function changewidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }
  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  }

  async function handleLogout(e){
     e.preventDefault();

    // const res = await dispatch(logout())
    // if(res?.payload?.success)
    navigate('/')
  }
  return (
    <div className="min-h-[94vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changewidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu w-48 p-4 sm:w-80 text-base-content min-h-full relative bg-base-100">
            {/* Sidebar content here */}
            <li className="w-fit absolute z-50 right-2">
              <button onClick={hideDrawer}>
                <GoXCircleFill size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn &&
              role ===
                "ADMIN"(
                  <li>
                    <Link to="admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}

            <li>
              <Link to="/course">Courses</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            
            {!isLoggedIn && (
              <li className="absolute top-44 w-[90%]">
              <div className="w-full flex items-center justify-center">
                <button className="btn-primary px-4 py-1 rounded-md w-full font-semibold bg-blue-600 text-white">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn-secondary px-4 py-1 rounded-md w-full font-semibold bg-pink-600 text-white">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
              </li>
            )}
          
           {isLoggedIn &&(
              <li className="absolute top-44 w-[90%]">
              <div className="w-full flex items-center justify-center">
                <button className="btn-primary px-4 py-1 rounded-md w-full font-semibold bg-blue-600 text-white">
                  <Link to="/profile">Profile</Link>
                </button>
                <button className="btn-secondary px-4 py-1 rounded-md w-full font-semibold bg-pink-600 text-white">
                  <Link onClick={handleLogout}>Logout</Link>
                </button>
              </div>
              </li>
           )}
           
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
