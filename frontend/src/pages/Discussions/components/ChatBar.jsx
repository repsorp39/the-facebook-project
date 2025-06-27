import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Dot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../store/features/friends-slice";
import { fetchChat } from "../../../store/features/discussions-slice";

const ChatBar = () => {
  const dispatch = useDispatch();
  const friendsList = useSelector((state) => state.friends.friends);
  const previewMessages = useSelector(state => state.chat.chatPreview);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchChat());
  }, []);

  return (
    <section className='w-[400px] h-[500px] bg-blue-50 shadow-sm fixed left-0 ms-10 pt-2 pb-1 px-2 rounded-lg flex flex-col content-center'>
      <div>
        {/* Search Bar */}
        <div className='flex items-center'>
          <span className='translate-x-9 group-focus:text-blue-500'>
            <Search />
          </span>
          <input
            type='search'
            className='ring-1 outline-none hover:outline-none hover:ring-blue-400 text-[14px] py-2 ps-10 text-gray-500 rounded-xl w-full'
            placeholder='Rechercher un ami ...'
          />
        </div>
        {/* Sections for chat with friends */}
        <h1 className='text-gray-500 font-bold my-3 text-xl'>
          Discutez-avec vos amis
        </h1>
        <div className='flex items-center content-center gap-2 w-full overflow-x-auto'>
          {/* Sort friends to show the online friends first */}
          
          {Array.from(friendsList)
            .sort((a, b) => +b.is_online - +a.is_online)
            .map((friend) => {
              return (
                <div className='relative' key={friend.id}>
                  <img
                    src={friend.picture}
                    alt={friend.firstname}
                    className='w-14 h-14 rounded-full object-cover'
                  />
                  <span className='absolute top-[28px] left-5'>
                    <Dot
                      className={`w-12 h-12 ${
                        Boolean(+friend.is_online)
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    />
                  </span>
                  <p>
                    {" "}
                    {friend.lastname.length > 10
                      ? friend.lastname.slice(0, 5) + "..."
                      : friend.lastname}{" "}
                  </p>
                </div>
              );
            })}
        </div>
        <h2 className="text-gray-500 font-bold my-3 text-xl mt-5">Vos disussions</h2>
        <div className='bg-blue-100 w-full h-full p-2 mt-2'>
            
        </div>
      </div>
    </section>
  );
};

export default ChatBar;
