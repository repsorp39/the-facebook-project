import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ModeratorRoutes = () => {
  const isModerator = useSelector((state) => state.auth.isModerator);
  const isLogin = useSelector(state => state.auth.isLoggedIn);
  
  return <>{(isModerator && isLogin) ? <Outlet /> : <Navigate to='/' replace />}</>;
};

export default ModeratorRoutes;
