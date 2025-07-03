import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ModeratorRoutes = () => {
  const isModerator = useSelector((state) => state.auth.isModerator);

  return <>{isModerator ? <Outlet /> : <Navigate to='/' replace />}</>;
};

export default ModeratorRoutes;
