import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ModeratorRoutes = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return <>{isAdmin ? <Outlet /> : <Navigate to='/' replace />}</>;
};

export default ModeratorRoutes;
