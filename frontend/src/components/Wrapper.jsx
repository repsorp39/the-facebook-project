import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import AdminNavBar from "./AdminNavBar";

const Wrapper = ({ children }) => {
  const isModerator = useSelector((state) => state.auth.isModerator);

  return (
    <main>
      {isModerator ? <AdminNavBar /> : <NavBar />}
      <div className={`min-h-[100vh] mx-auto p-2 overflow-x-auto`}>
        <div className='mt-20'></div>
        {children}
      </div>
    </main>
  );
};

export default Wrapper;
