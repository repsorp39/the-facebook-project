import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../store/features/user-slice";

function CommonRoutes() {
  const isLogin = useSelector(isLoggedInSelector);
  return <>{!isLogin ? <Navigate to='/login' replace /> : <Outlet />}</>;
}

export default CommonRoutes;
