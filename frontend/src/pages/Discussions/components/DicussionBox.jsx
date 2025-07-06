import React, { useEffect, useState, useRef,useCallback } from "react";
import { UsersRound } from "lucide-react";
import getAxiosInstance from "../../../config/axios-config";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MessageLoader from "./MessageLoader";
import Messages from "./Messages";

const DicussionBox = () => {
  const http = getAxiosInstance();
  // discussionid come from my navbar and it is a string
  //the default value for discussionid is 0
  //so we can show an empty discussion box if the friendid doesn't match any real value

  const { discussionid } = useParams();

  //I convert it in number so I won't get error
  const friendId = Number(discussionid) || 0;
  const timerId = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friendInfo, setFriendInfo] = useState({});

  const messageBoxRef = useRef();

  const fetchDiscussions = useCallback(async function fetchDiscussions() {
    const res = await http.get(
      `/messages/message.get.php?friend_id=${friendId}`
    );
    setMessages(res.data);
  },[friendId])

    function intervalSetter() {
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = setInterval(fetchDiscussions, 2000);
      } else{
        timerId.current = setInterval(fetchDiscussions, 2000);
      }
    }

  async function fetchChatWithFriend() {
    try {
      if(isLoading) return;
      setLoading(true);
      const { data: friendinfo } = await http.get(
        `/users/user.get.php?id=${friendId}`
      );
      setFriendInfo(friendinfo);
      await fetchDiscussions();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue ");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (friendId) {
      fetchChatWithFriend();
      intervalSetter();
    }
    return () => clearTimeout(timerId.current);
  }, [friendId]);

  useEffect(() => {
    //We need to go to the bottom of the page each time a new message is sent or is received
    //So each 3s seconds we check if the position of the user it is to the top of the page
    //or if user is already located to the bottom of the page
    //if the user is at the bottom of the page, we can go to the full bottom ensuring that
    //he will see the incoming message, but if the user is not at the bottom of the page,
    //by example he is reading the old messages, it won't be convenient to put him at
    //the bottom of the page each 3s since  he just want to read old messages.
    //so with tag.scrollHeight-tag.clientHeight we get the max possible scroll
    //and scrollTop give us the current position from the top
    //after making substraction we know that it is 0 if he is at the bottom and we can apply our function

    const messageBox = messageBoxRef.current;
    if (!messageBox) return;

    const offset =
      messageBox.scrollHeight - messageBox.clientHeight - messageBox.scrollTop;
    if (
      offset <= 100 ||
      offset === messageBox.scrollHeight - messageBox.clientHeight
    ) {
      messageBox.scrollTo({top:messageBox.scrollHeight,behaviour:"smooth"});
    }
  });

  return (
    <div
      className={`bg-blue-50 flex flex-col flex-grow shrink-0 min-w-[450px] ${
        friendId ? "" : "items-center content-center place-content-center"
      } `}
    >
      {/* friendId is a number. To be falsy it has to be  0 */}
      {/* So I use Boolean to convert it in bool */}
      {/* If I don't use bool it can't be false  */}
      {!Boolean(friendId) && (
        <div className='items-center content-center flex flex-col'>
          <span className='block m-auto text-center'>
            <UsersRound className='w-10 h-10 text-gray-400' />
          </span>
          <h2 className='text-xl text-center font-semibold text-gray-400'>
            Démarrer une discussion avec un ami
          </h2>
        </div>
      )}

      {Boolean(friendId) && (
        <div
          className={`flex-grow ${
            isLoading ? "place-content-center mx-auto" : ""
          }`}
        >
          {isLoading ? (
            <MessageLoader />
          ) : (
            <Messages
              messages={messages}
              friendinfo={friendInfo}
              messageBoxRef={messageBoxRef}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DicussionBox;
