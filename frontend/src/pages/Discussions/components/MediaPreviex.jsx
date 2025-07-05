import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const MediaPreview = ({ media, resetInputForm }) => {
  console.log(media);
  
  return (
    <div className='h-[200px] z-10  ms-5 absolute left-0 top-20 flex flex-col items-center content-center group'>
      <div className='max-w-[350px] max-h-[250px] object-contain'>
        {media.type === "image" && (
          <img
            className='border-2 shadow-lg border-gray-500'
            src={media.url}
            alt=''
          />
        )}
        {media.type === "video" && <video src={media.url} controls></video>}
      </div>
      <span
        onClick={resetInputForm}
        className='absolute top-[-10px] left-[-10px]'
      >
        {" "}
        <IoIosCloseCircle className='w-8 h-8 text-gray-600 group-hover:text-red-600 cursor-pointer transition' />{" "}
      </span>
    </div>
  );
};

export default MediaPreview;
