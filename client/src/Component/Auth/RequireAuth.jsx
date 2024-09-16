import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.authReducer);
  console.log("ISLOGGED IN", isLoggedIn);

  const location = useLocation();
  const navigate = useNavigate();
  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <NavLink to="/denied" />
  ) : (
    <NavLink to="/login" />
  );
}

export default RequireAuth;
