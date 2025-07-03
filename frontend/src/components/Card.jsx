import React from "react";

const Card = ({Icon,Label}) => {
  return (
    <div
      className={`self-start group block rounded-xl  hover:bg-blue-50 transition border-gray-200 shadow-sm border-2 p-4 `}
    >
      <div className='flex items-center gap-4'>
        <div className='p-2 bg-blue-100 text-blue-600 rounded-full'>
          {Icon}
        </div>
        <div className='text-sm font-medium text-gray-800 group-hover:text-blue-700 transition'>
          {Label}
        </div>
      </div>
    </div>
  );
};

export default Card;
