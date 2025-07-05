import React from "react";
import { Ban, Trash, Trash2 } from "lucide-react";
import getAxiosInstance from "../../../config/axios-config";
import toast from "react-hot-toast";

const SingleMessage = ({ message, userid }) => {
  const http = getAxiosInstance();

  async function handleDelete() {
    try {
      await http.delete(`/messages/message.delete.php?id=${message.id}`);
      toast.success("Message supprimé");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue");
    }
  }

  let content = "";
  if (Boolean(+message.deleted)) {
    content = (
      <span className='flex items-center text-sm bg-emerald-600 max-w-[240px] p-2 rounded-xl text-gray-600 italic'>
        <Ban className="w-4 h-4" /> <span>Ce message a été supprimé.</span>
      </span>
    );
  } else if (message.type === "text") {
    content = (
      <span className='text-wrap break-words break-all inline-block bg-emerald-700 text-white max-w-[240px] min-w-[50px] px-2 py-2 rounded-2xl text-sm'>
        {" "}
        {message.content}{" "}
      </span>
    );
  } else if (message.type === "audio") {
    content = (
      <div>
        <audio src={message.content} controls></audio>
      </div>
    );
  } else if (message.type === "video") {
    content = (
      <div className='max-w-[260px] object-cover'>
        <span> {message.description && message.description} </span>
        <video src={message.content} controls></video>
      </div>
    );
  } else if (message.type === "image") {
    content = (
      <div className='max-w-[260px] object-cover'>
        <span className='text-sm text-gray-500'>
          {" "}
          {message.description && message.description}{" "}
        </span>
        <img className='w-full h-full' src={message.content} alt='' />
      </div>
    );
  }

  return (
    <div
      className={`mt-1 message transition-all ease-linear flex items-center  ${
        userid === message.user_id1 ? "justify-end" : ""
      } `}
    >
      {" "}
      <div className='flex flex-col items-end group transition relative group'>
        {!Boolean(+message.deleted) && (
          <span>
            <Trash2
              onClick={handleDelete}
              className='w-5 h-5 z-50 absolute hover:bg-red-400 left-0 bg-white p-1 rounded-full text-red-600 hidden group-hover:inline-block transition-all ease-out cursor-pointer'
            />
          </span>
        )}
        {content}{" "}
      </div>{" "}
    </div>
  );
};

export default React.memo(SingleMessage);
