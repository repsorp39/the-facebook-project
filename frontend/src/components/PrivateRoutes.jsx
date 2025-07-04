import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../store/features/user-slice";

function PrivateRoutes() {
  const isModerator = useSelector((state) => state.auth.isModerator);
  const isLogin = useSelector(isLoggedInSelector);
  return (
    <>
      {!isLogin ? (
        <Navigate to='/login' replace />
      ) : isModerator ? (
        <Navigate to={"/moderator/users"} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PrivateRoutes;
