import { CheckLine } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ 
    friend, 
    handleSuccess, 
    handleCancel,
  }) => {
  const [hasAddFriend, setHasAddFriend] = useState(false);

  return (
    <div className='w-[180px] h-[240px] pb-3 bg-white border border-gray-200 shadow-md  flex flex-col items-center text-center hover:shadow-lg transition rounded-2xl'>
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
        className='text-lg font-semibold text-gray-800 mb-2'
      >
        {(friend.firstname + " " + friend.lastname).length > 10
          ? (friend.firstname + " " + friend.lastname).slice(0, 10) + "..."
          : friend.firstname + " " + friend.lastname}
      </Link>

      {/* Boutons */}
      <div className='flex gap-2 mt-2'>
        <button
         disabled={hasAddFriend}
          onClick={() => {
            setHasAddFriend(true);
            handleSuccess(friend.id);
          }}
          className={`text-center px-4 py-2 ${!hasAddFriend ? "bg-blue-600 hover:bg-blue-700" :"bg-emerald-500 cursor-default"} text-white text-sm rounded-lg  transition`}
        >
          {hasAddFriend ? (
            <>
              <CheckLine /> 
            </>
          ) : (
             "Ajouter"
          )}
        </button>
       {
        !hasAddFriend &&  <button
        onClick={() => handleCancel(friend.id)}
        className='px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition disabled:cursor-not-allowed'
      >
        <span>Cacher</span>
      </button>
       }
      </div>
    </div>
  );
};

export default ContactCard;
