import React from "react";

const Loader = ({ message }) => {
  return (
    <div className='mt-5 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg mb-5 flex items-center justify-center gap-3 p-6 text-gray-500'>
      <div className='place-content-center flex flex-col justify-center content-center items-center'>
        <div className='w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
      <span className='text-sm font-medium'> {message} </span>
    </div>
  );
};

export default Loader;
