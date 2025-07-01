import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriends,
  friendsSelector,
  removeFriend,
} from "../../../store/features/friends-slice";
import EmptyComponent from "../../../components/EmptyComponent";
import { UserX2 } from "lucide-react";
import ContactListWrapper from "./ContactWrapper";
import ContactCardFriend from "./ContactCardFriend";
import getAxiosInstance from "../../../config/axios-config";
import toast from "react-hot-toast";

const FriendList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(friendsSelector);

  const [limit, setLimit] = useState(6);

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  if (friends.length === 0) {
    return <EmptyComponent Icon={UserX2} message='Aucun amis pour le moment' />;
  }

  async function handleRejection(friendid) {
    try {
      const http = getAxiosInstance();
      await http.delete(`/friendship/friendship-reject.php?id=${friendid}`);
      dispatch(removeFriend(friendid));
      toast.success("Un ami retiré!", { icon: "💔", duration: 3500 });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className='text-xl font-bold mb-10'>Vos amis ({friends.length}) </h1>
      <ContactListWrapper listLength={friends.length} setLimit={setLimit}>
        {friends.slice(0, limit).map((friend) => (
          <ContactCardFriend
            key={friend.id}
            friend={friend}
            handleRejection={handleRejection}
          />
        ))}
      </ContactListWrapper>
    </>
  );
};

export default FriendList;
