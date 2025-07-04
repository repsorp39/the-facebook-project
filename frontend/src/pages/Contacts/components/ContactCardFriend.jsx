import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2Icon,
} from "lucide-react";
import { PiMessengerLogo } from "react-icons/pi";

const ContactCardFriend = ({ friend, handleRejection }) => {

  const navigate = useNavigate();

  return (
    <div className='w-[180px] h-[240px] pb-3 bg-white border border-gray-200 shadow-md  flex flex-col items-center text-center hover:shadow-lg transition rounded-2xl relative group'>
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
          ? (friend.firstname + " " + friend.lastname).slice(0, 10) + "..."
          : friend.firstname + " " + friend.lastname}
      </Link>

      {/* Boutons */}
      <div className='flex gap-2 mt-2 w-full'>
        <button onClick={()=>navigate(`/discussions/${friend.id}`)} className='mx-2 w-full flex flex-col items-center content-center px-4 py-1 ring-1 ring-white bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 group-hover:ring-blue-400 transition' title="Écrire un mot" >
          <span className='block' >
            <PiMessengerLogo className='text-blue-600  w-5 h-5' />
          </span>
        </button>
      </div>
      <span
        onClick={() => handleRejection(friend.id)}
        title="Retirer de vos amis"
        className='absolute top-0 left-0 m-3 group-hover:bg-white p-2 rounded-full transition hover:text-red-600 cursor-pointer'
      >
        <Trash2Icon className='w-6 h-5 ' />
      </span>
    </div>
  );
};

export default ContactCardFriend;
