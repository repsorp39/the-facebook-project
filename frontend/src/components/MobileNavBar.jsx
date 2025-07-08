import React, { useState } from "react";
import logo from "../assets/images/brandmark.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/features/user-slice";
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import {
  House,
  MessageCircleMore,
  UsersRound,
  BellRing,
  User,
} from "lucide-react";

const NavBar = () => {
  const user = useSelector((state) => state.auth.userinfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHidden, setHidden] = useState(true);
  const toggleVisibility = () => setHidden(!isHidden);
  const items = [
    {
      path: "/",
      label: "Accueil",
      icon: <House />,
    },
    {
      path: "/discussions/0",
      label: "Discussions",
      icon: <MessageCircleMore />,
    },
    {
      path: "/contacts",
      label: "Contacts",
      icon: <UsersRound />,
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: <BellRing />,
    },
    {
      path: `/profile/${user.userid}`,
      label: "Profil",
      icon: <User />,
    },
    {
      path: `/settings`,
      label: "Paramètres",
      icon: <FaGear />,
    },
  ];

  return (
    <header className='flex fixed w-full flex-col bg-white h-16 shadow-sm z-20 md:hidden px-3 border-b border-gray-200'>
      {/* Logo */}
      <section className='flex items-center justify-between h-16'>
        <div>
          <img
            src={logo}
            alt='Logo'
            className='w-40 h-auto object-contain cursor-pointer'
          />
        </div>
        <div className='inline-block cursor-pointer transition' onClick={toggleVisibility}>
          {isHidden ? (
            <GiHamburgerMenu className='h-8 w-8' />
          ) : (
            <IoClose className='h-8 w-8' />
          )}
        </div>
      </section>

      {!isHidden && (
        <nav className='mb-5 z-30 bg-gray-900 p-3 text-sm shadow-md text-white rounded-md mt-2'>
          <ul>
            {items.map((item) => {
              const classname =
                "text-white font-medium me-3 flex justify-start items-center w-full p-3";

              return (
                <li className='w-full flex flex-col' key={item.label}>
                  <NavLink
                    className={(link) =>
                      link.isActive
                        ? `${classname} bg-blue-500 w-full rounded-sm`
                        : `${classname}`
                    }
                    to={item.path}
                  >
                    {" "}
                    <span className='me-3'>{item.icon}</span>{" "}
                    <span className='block'>{item.label}</span>{" "}
                  </NavLink>{" "}
                </li>
              );
            })}
            <li className='w-full flex flex-col mt-3'>
              <button onClick={()=>dispatch(logoutUser())} className='bg-red-800 text-white rounded-xl font-semibold p-3'>
                {" "}
                Se déconnecter{" "}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
