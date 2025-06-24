import React from 'react';
import NavBar from './NavBar';
const Wrapper = ({ children }) => {
  
  return (
    <main>
      <NavBar />
      <div className='min-h-[100vh]   w-[50%] mx-auto p-2'>
        <div className='mt-20'></div>
        { children }
      </div>
    </main>
  );
};

export default Wrapper;