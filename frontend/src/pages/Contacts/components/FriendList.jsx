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
import Loader from "../../../components/Loader";

const FriendList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(friendsSelector);

  const [limit, setLimit] = useState(6);
  const isLoading = useSelector((state) => state.friends.isFetchingList);

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  if (isLoading) {
    return <Loader message={"Chargement de votre liste d'amis"} />;
  }

  if (!isLoading && friends.length === 0)
    return <EmptyComponent Icon={UserX2} message='Aucun ami pour le moment.' />;

  async function handleRejection(friendid) {
    try {
      toast.loading("Suppression d'un ami", {
        position: "top-center",
      });
      const http = getAxiosInstance();
      await http.delete(`/friendship/friendship-reject.php?id=${friendid}`);
      dispatch(removeFriend(friendid));
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss();
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
