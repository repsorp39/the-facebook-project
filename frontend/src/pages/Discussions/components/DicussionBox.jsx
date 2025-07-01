import { MoveLeft, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import getAxiosInstance from "../../../config/axios-config";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MessageLoader from "./MessageLoader";
import Messages from "./Messages";

const DicussionBox = () => {
  const http = getAxiosInstance();
  // discussionid come from my navbar and it is a string
  //the default value for discussionid is 0
  //so we can show an empty discussio box if the friendid doesn't match any real value

  const { discussionid } = useParams();

  //I convert it in number so I won't get error
  const friendId = Number(discussionid) || 0;

  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friendInfo, setFriendInfo] = useState({});

  async function fetchChatWithFriend() {
    try {
      setLoading(true);
      const { data: friendinfo } = await http.get(
        `/users/user.get.php?id=${friendId}`
      );
      setFriendInfo(friendinfo);
      const res = await http.get(
        `/messages/message.get.php?friend_id=${friendId}`
      );
      setMessages(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue ");
    }
  }

  useEffect(() => {
    if (friendId) {
      fetchChatWithFriend();
    }
  }, [friendId]);

  return (
    <div
      className={` bg-blue-50 flex flex-col flex-grow shrink-0 min-w-[400px] ${
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
        <div className={`flex-grow ${isLoading ? "place-content-center mx-auto":""}`}>
          {isLoading ? (
            <MessageLoader />
          ) : (
            <Messages messages={messages} friendinfo={friendInfo} />
          )}
        </div>
      )}
    </div>
  );
};

export default DicussionBox;
