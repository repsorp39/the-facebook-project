import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { RiSendPlaneLine } from "react-icons/ri";
import toast from "react-hot-toast";
import getAxiosInstance from "../../../config/axios-config";
import MediaPreview from "./MediaPreviex";
import AudioRecorder from "./AudioRecorder";

const SendBar = ({ friendid }) => {
  const [inputContent, setInputContent] = useState("");
  const [media, setMedia] = useState({});

  function handleMediaUpload(e) {
    const file = e.target.files[0];
    setMedia({});

    if (
      file &&
      !(
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type.startsWith("audio/")
      )
    ) {
      return toast.error("Type de fichier non supporté");
    }

    if (file.size > 10_000_000) {
      return toast.error("Fichier trop volumineux! 10 mo maximum");
    }

    setMedia({
      type: file.type.split("/")[0],
      url: URL.createObjectURL(file),
      file: file,
    });
  }

  async function sendMessage() {
    try {
      const http = getAxiosInstance();
      const formData = new FormData();
      formData.append("user_id", friendid);
      formData.append("type", media.type ?? "text");
      formData.append("content", inputContent);
      //we have description only if we have a media and the input content filled
      if (media.file) {
        formData.append("description", inputContent);
        formData.append("media", media.file);
      }
      
      await http.post("/messages/message.create.php", formData);
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'upload");
      console.log(err);
    } finally {
      resetFormInput();
    }
  }

  function resetFormInput() {
    setInputContent("");
    setMedia({});
  }
  return (
    <>
      <div className='flex items-center my-2 shrink-0 relative'>
        <label htmlFor='media'>
          {" "}
          <PlusCircle className='w-5 translate-x-6 cursor-pointer' />
        </label>
        <input
          name='media'
          id='media'
          type='file'
          className='hidden'
          accept='image/*,video/*,audio/*'
          onChange={handleMediaUpload}
        />
        <textarea
          autoFocus
          onChange={(e) => setInputContent(e.target.value)}
          value={inputContent}
          placeholder='Taper un message ...'
          readOnly={media.type === "audio"}
          className='pl-8 pt-3 pr-4 rounded-3xl text-sm text-gray-700 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none h-[45px] w-full scrollbar-hidden'
        />
        <span>
          {inputContent.trim() === "" && !media.file ? (
            <AudioRecorder setMedia={setMedia} />
          ) : (
            <RiSendPlaneLine
              className='w-5 -translate-x-6 cursor-pointer'
              onClick={sendMessage}
            />
          )}
        </span>
      </div>
      {media.url && (
        <MediaPreview media={media} resetInputForm={resetFormInput} />
      )}
    </>
  );
};

export default SendBar;
