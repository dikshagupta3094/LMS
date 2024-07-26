import React from "react";
import { FiMenu } from "react-icons/fi";
import { GoXCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Footer from '../Component/Footer'
function HomeLayout({children}) {
  function changewidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 'auto';
  }
  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
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
            <li>
            <Link to="/course">Courses</Link>
            </li>
            <li>
            <Link to="/about">About us</Link>
            </li>
            <li>
            <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {children}

      <Footer/>
    </div>
  );
}

export default HomeLayout;
