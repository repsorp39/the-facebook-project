import React from "react";
import { Dot, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SendBar from "./SendBar";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";

const Messages = ({ messages, friendinfo, messageBoxRef }) => {
  const navigate = useNavigate();
  const userid = useSelector((state) => state.auth.userinfo.userid);

  
  return (
    <section className='flex flex-col relative overflow-auto'>
      <section className='flex items-center gap-3 px-3 py-2 border-b-2 border-dotted border-gray-300'>
        {/* Message Header */}
        <div>
          <div>
            <MoveLeft
              className='cursor-pointer'
              onClick={() => navigate("/discussions/0")}
            />
          </div>
        </div>
        <div
          className='w-10 h-10 shrink-0 group relative cursor-pointer'
          onClick={() => navigate(`/profile/${friendinfo.id}`)}
        >
          <img
            src={friendinfo.picture}
            className='w-full h-full rounded-full group-hover:scale-110 transition border-2 border-gray-500'
            alt=''
          />
          <span
            className={`absolute top-[10px] left-[14px] ${
              Boolean(+friendinfo.is_online)
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {" "}
            <Dot className='w-10 h-12' />{" "}
          </span>
        </div>
        <div className='truncate text-md font-semibold text-gray-600'>
          {friendinfo.firstname + " " + friendinfo.lastname}
        </div>
      </section>
      <section
        ref={messageBoxRef}
        className='flex flex-col h-[400px] overflow-y-auto bg-blue-50 px-3'
      >
        {messages.map((message) => (
          <SingleMessage message={message} key={message.id} userid={userid} />
        ))}
      </section>
      <SendBar friendid={friendinfo.id} />
    </section>
  );
};

export default Messages;
