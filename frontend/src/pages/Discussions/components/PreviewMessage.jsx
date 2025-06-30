import { AudioLines, Image, Play } from "lucide-react";
import React from "react";

const PreviewMessage = ({ message, action }) => {
  return (
    <div
      onClick={action}
      className='flex items-center gap-3 bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition mb-2 shadow-sm cursor-pointer'
    >
      {/* Avatar */}
      <div className='w-12 h-12 shrink-0'>
        <img
          src={message.picture}
          alt={`${message.firstname} ${message.lastname}`}
          className='w-full h-full rounded-full object-cover border'
        />
      </div>

      {/* Infos message */}
      <div className='flex flex-col justify-center w-full overflow-hidden'>
        <h4 className='font-semibold text-gray-800 text-sm '>
          {message.firstname} {message.lastname}
        </h4>

        {message.type === "text" && (
          <p className='text-sm text-gray-600  flex items-center gap-1'>
            {message.content.length > 40
              ? message.content.slice(0, 40) + "..."
              : message.content}
          </p>
        )}

        {message.type === "audio" && (
          <p className='text-sm text-gray-600 flex items-center gap-1'>
            <AudioLines className='w-4 h-4 text-blue-500' />
            <span>Audio</span>
          </p>
        )}

        {message.type === "video" && (
          <p className='text-sm text-gray-600 flex items-center gap-1'>
            <Play className='w-4 h-4 text-red-500' />
            <span>Vidéo</span>
          </p>
        )}

        {message.type === "image" && (
          <p className='text-sm text-gray-600 flex items-center gap-1'>
            <Image className='w-4 h-4 text-green-600' />
            <span>Photo</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewMessage;
