import React from 'react';

const ImageRounded = ({imgUrl}) => {
  return (
    <div>
        <img
            src={imgUrl}
            alt=''
            className='w-12 h-12 rounded-full object-cover border border-gray-300 group-hover:scale-105 transition'
          />
    </div>
  );
};

export default ImageRounded;