import React from 'react';
import NavBar from './NavBar';
const Wrapper = ({ children }) => {
  
  return (
    <main>
      <NavBar />
      <div className='min-h-[100vh] bg-slate-100  w-[70%] mt-10 mx-auto'>
        { children }
      </div>
    </main>
  );
};

export default Wrapper;