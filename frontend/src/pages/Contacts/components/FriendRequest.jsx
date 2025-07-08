import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmFriend,
  fetchFriendsRequest,
  friendsReqSelector,
  removeRequest,
} from "../../../store/features/friends-slice";
import EmptyComponent from "../../../components/EmptyComponent";
import { PersonStanding, Trash2Icon } from "lucide-react";
import ContactListWrapper from "./ContactWrapper";
import getAxiosInstance from "../../../config/axios-config";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

const FriendRequest = () => {
  const dispatch = useDispatch();
  const http = getAxiosInstance();

  const friendsRequest = useSelector(friendsReqSelector);
  const isLoading = useSelector((state) => state.friends.isFetchingReq);

  const [limit, setLimit] = useState(6);
  async function handleConfirm(friendid) {
    try {
      toast.loading("Confirmation d'une invitation", {
        position: "top-center",
        style: { color: "green" },
      });
      const formData = new FormData();
      formData.append("id", friendid);
      await http.post("/friendship/friendship-confirm.php", formData);
      dispatch(confirmFriend(friendid));
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss();
    }
  }

  async function handleRejection(friendid) {
    try {
      toast.loading("Suppression d'une invitation ...", {
        position: "top-center",
        style: { color: "red" },
      });
      await http.delete(`/friendship/friendship-reject.php?id=${friendid}`);
      dispatch(removeRequest(friendid));
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss();
    }
  }

  useEffect(() => {
    dispatch(fetchFriendsRequest());
  }, []);

  if (isLoading) {
    return <Loader message={"Chargement des invitations d'amis"} />;
  }

  if (!isLoading && friendsRequest.length === 0)
    return (
      <EmptyComponent
        Icon={PersonStanding}
        message='Aucune suggestion disponible.'
      />
    );

  return (
    <>
      <h1 className='text-xl font-bold mb-10'>
        Ceux-ci voudraient faire connaissance ({friendsRequest.length}){" "}
      </h1>

      <ContactListWrapper
        listLength={friendsRequest.length}
        setLimit={setLimit}
      >
        {friendsRequest.slice(0, limit).map((friend) => (
          <div
            key={friend.id}
            className='w-[180px] h-[240px] pb-3 bg-white border border-gray-200 shadow-md  flex flex-col items-center text-center hover:shadow-lg transition rounded-2xl relative group'
          >
            {/* Avatar */}
            <Link
              to={`/profile/${friend.id}`}
              className='w-full place-content-center'
            >
              <img
                src={friend.picture}
                alt={friend.firstname}
                className='rounded-lg h-[150px] w-full object-cover hover:scale-105 transition ease-linear'
              />
            </Link>

            {/* Nom */}
            <Link
              to={`/profile/${friend.id}`}
              className='text-sm mt-2 font-semibold text-gray-800 mb-2'
            >
              {(friend.firstname + " " + friend.lastname).length > 10
                ? (friend.firstname + " " + friend.lastname).slice(0, 10) +
                  "..."
                : friend.firstname + " " + friend.lastname}
            </Link>

            {/* Boutons */}
            <div className='flex gap-2 mt-2 mb-5 flex-col'>
              <button
                onClick={() => {
                  handleConfirm(friend.id);
                }}
                className={`flex items-center text-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500  transition`}
              >
                Confirmer
              </button>
            </div>
            <span
              onClick={() => handleRejection(friend.id)}
              title='Retirer'
              className='absolute top-0 left-0 m-3 group-hover:bg-white p-2 rounded-full transition hover:text-red-600 cursor-pointer'
            >
              <Trash2Icon className='w-6 h-5' />
            </span>
          </div>
        ))}
      </ContactListWrapper>
    </>
  );
};

export default FriendRequest;
