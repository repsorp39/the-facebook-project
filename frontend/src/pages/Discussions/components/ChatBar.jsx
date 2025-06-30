import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../store/features/friends-slice";
import { fetchChat } from "../../../store/features/discussions-slice";
import PreviewMessage from "./PreviewMessage";
import { useNavigate } from "react-router-dom";

const ChatBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const friendsList = useSelector((state) => state.friends.friends);
  const previewMessages = useSelector((state) => state.chat.chatPreview);

  const userid = (state) => state.auth.userinfo.userid;


  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchChat());
  }, []);

  function handleConversationStart(id) {
    navigate(`/discussions/${id}`);
  }

  return (
    <section className='w-[400px] shrink-0 min-w-[350px] bg-slate-100 p-4 flex flex-col gap-4 border-r-2 border-blue-100'>
      {/* Barre de recherche */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
        <input
          type='search'
          placeholder='Rechercher un ami ...'
          className='pl-10 pr-4 py-2 w-full rounded-lg text-sm text-gray-700 bg-white border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
        />
      </div>

      <div>
        <h2 className='text-gray-600 font-semibold text-lg mb-2'>
          Discutez avec vos amis
        </h2>
        <div className='flex items-center gap-3 overflow-x-auto pb-1'>
          {Array.from(friendsList)
            .sort((a, b) => +b.is_online - +a.is_online)
            .map((friend) => (
              <div
                className='text-center relative cursor-pointer'
                key={friend.id}
                onClick={() => handleConversationStart(friend.id)}
              >
                <img
                  src={friend.picture}
                  alt={friend.firstname}
                  className='w-14 h-14 rounded-full object-cover border-2 border-white shadow'
                />
                <span
                  className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white bg-gray-400 
                ${Boolean(+friend.is_online) ? "bg-green-500" : "bg-gray-400"}`}
                ></span>
                <p className='text-xs mt-1 text-gray-700 font-medium w-14'>
                  {friend.lastname.length > 10
                    ? friend.lastname.slice(0, 5) + "..."
                    : friend.lastname}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className='flex flex-col flex-grow'>
        <h2 className='text-gray-600 font-semibold text-lg mb-2 mt-1'>
          Vos discussions
        </h2>
        <div className='bg-white max-h-[260px] flex-1 rounded-md shadow-inner overflow-y-auto p-2 space-y-2'>
          {previewMessages.length > 0 ? (
            previewMessages.map((message) => (
              <PreviewMessage
                key={message.id}
                message={message}
                action={() =>
                  handleConversationStart(
                    +message.user_id1 === userid ? message.user_id1 : message.user_id2
                  )
                }
              />
            ))
          ) : (
            <div className='flex items-center justify-center text-sm text-gray-400 h-full'>
              Aucune discussion pour le moment
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatBar;
