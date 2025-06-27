import React from "react";

const EmptyComponent = ({ Icon, message }) => {
  return (
    <div className='mt-5 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg mb-5 flex items-center justify-center gap-3 p-6 text-gray-500'>
      <Icon className='w-6 h-6 text-gray-400' />
      <span className='text-sm font-medium'> { message } </span>
    </div>
  );
};

export default EmptyComponent;
