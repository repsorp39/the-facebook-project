import React from 'react';
import NavBar from './NavBar';
const Wrapper = ({ children }) => {
  
  return (
    <main>
      <NavBar />
      <div className={`min-h-[100vh] mx-auto p-2 overflow-x-auto`}>
        <div className='mt-20'></div>
        { children }
      </div>
    </main>
  );
};

export default Wrapper;