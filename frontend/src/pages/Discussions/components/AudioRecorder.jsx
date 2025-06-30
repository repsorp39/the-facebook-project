import React, { useEffect, useState } from "react";
import { AiTwotoneAudio } from "react-icons/ai";
import { FaRegCircleStop } from "react-icons/fa6";
import { countRecordDuration } from "../../../utils/";

const AudioRecorder = ({ setMedia }) => {
  const [recorderManager, setRecorderManager] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setDuration] = useState("00:00");
  const [timeId, setTimeId] = useState(null);

  useEffect(() => {
    if (isRecording) {
      setMedia((prev) => ({ ...prev,type:"audio"}));
      let time = 0;
      let id = setInterval(() => {
        time += 1;
        setDuration(countRecordDuration(time));
      }, 1000);
      setTimeId(id);
    } else {
      if (timeId) clearInterval(timeId);
    }
  }, [isRecording]);

  const initRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blobAudio = new Blob(chunks, { type: "audio/mp3" });
        setMedia({
          type: "audio",
          url: URL.createObjectURL(blobAudio),
          file:blobAudio
        });
        stream.getTracks().forEach((track) => track.stop());
      };

      //starting record
      mediaRecorder.start();
      setIsRecording(true);
      setRecorderManager(mediaRecorder);
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecord = () => {
    setIsRecording(false);
    recorderManager.stop();
  };

  return (
    <strong>
      {!isRecording ? (
        <AiTwotoneAudio className='w-5 -translate-x-6 cursor-pointer' onClick={()=>initRecord()} />
      ) : (
        <>
          <FaRegCircleStop className='w-5 -translate-x-6 cursor-pointer' onClick={() => stopRecord() } />
          <span className='truncate text-red-600 fixed -translate-x-7 mt-2 text-[10px]'> {recordDuration}</span>
        </>
      )}
    </strong>
  );
};

export default AudioRecorder;
