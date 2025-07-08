import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyComponent from "../../../components/EmptyComponent";
import { PersonStanding } from "lucide-react";
import getAxiosInstance from "../../../config/axios-config";
import toast from "react-hot-toast";
import ContactCardSuggestion from "./ContactCardSuggestion";
import ContactListWrapper from "./ContactWrapper";
import {
  fetchFriendsSuggestions,
  friendsSuggestionsSelector,
  removeSuggestions,
} from "../../../store/features/friends-slice";
import Loader from "../../../components/Loader";

const FriendSuggestions = () => {
  const dispatch = useDispatch();
  const http = getAxiosInstance();
  const ref = useRef(null);

  const friendsSuggestions = useSelector(friendsSuggestionsSelector);
  const [limit, setLimit] = useState(6);
  const isLoading = useSelector(state => state.friends.isFetchingSuggestion);


  useEffect(() => {
    dispatch(fetchFriendsSuggestions());
  }, []);

  if(isLoading){
    return <Loader message={"Chargement des suggestions d'amis"} />
  }

  if (!isLoading &&  friendsSuggestions.length === 0 )
    return (
      <EmptyComponent
        Icon={PersonStanding}
        message='Aucune suggestion disponible.'
      />
    );

  async function handleAddFriend(friendid) {
    try {
      const formData = new FormData();
      formData.append("id", friendid);
      const res = await http.post("/friendship/friendship-send.php", formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleHideFriend(friendid) {
    dispatch(removeSuggestions(friendid));
    toast.success("Une suggestion cachée");
  }

  return (
    <section ref={ref}>
      <h1 className='text-xl font-bold mb-10'>
        Vous connaissez-peut être ? ({friendsSuggestions.length}){" "}
      </h1>
      <ContactListWrapper
        listLength={friendsSuggestions.length}
        setLimit={setLimit}
      >
        {friendsSuggestions.slice(0, limit).map((friend) => (
          <ContactCardSuggestion
            friend={friend}
            key={friend.id}
            handleCancel={handleHideFriend}
            handleSuccess={handleAddFriend}
          />
        ))}
      </ContactListWrapper>
    </section>
  );
};

export default FriendSuggestions;
