import { Dot, MoveLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SendBar from "./SendBar";
import SingleMessage from "./SingleMessage";

const Messages = ({ messages, friendinfo }) => {
  const navigate = useNavigate();
  return (
    <section className='flex flex-col relative'>
      <section className='flex  items-center gap-3 px-3 py-2 border-b-2 border-dotted border-gray-300'>
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
        <div className='truncate text-sm font-semibold text-gray-600'>
          {friendinfo.firstname + " " + friendinfo.lastname}
        </div>
      </section>
      <section className='flex flex-col h-[400px] bg-blue-50'>
        {messages.map((message) => (
          <SingleMessage message={message} key={message.id} />
        ))}
      </section>
      <SendBar friendid={friendinfo.id} />
    </section>
  );
};

export default Messages;
