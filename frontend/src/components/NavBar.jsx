import React from "react";
import logo from "../assets/images/brandmark.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/features/user-slice";

import {
  House,
  MessageCircleMore,
  UsersRound,
  BellRing,
  Settings,
  EllipsisVertical,
  LogOutIcon,
} from "lucide-react";

const NavBar = () => {
  const user = useSelector((state) => state.auth.userinfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  ];
  const pathname = useLocation().pathname;
  return (
    <header className='fixed top-0 w-full h-16 bg-white shadow-sm z-20 flex items-center justify-between px-6 border-b border-gray-200'>
      {/* Logo */}
      <section className='flex items-center gap-6'>
        <img src={logo} alt='Logo' className='w-40 h-auto object-contain cursor-pointer' />
      </section>

      {/* Icônes de navigation */}
      <section className='w-1/3'>
        <ul className='flex items-center justify-between gap-4'>
          {items.map((item, index) => (
            <li key={item.label} className='relative'>
              <NavLink
                to={item.path}
                id={item.label}
                className={`rounded-md hover:bg-gray-100 transition [&_svg]:w-5 [&_svg]:h-5 w-full ${
                 (pathname === item.path || (pathname.startsWith(item.path) && item.path.length > 1))
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {item.icon}
              </NavLink>
              <Tooltip anchorSelect={`#${item.label}`} content={item.label} />
            </li>
          ))}
        </ul>
      </section>

      {/* Profil utilisateur */}
      <section className='flex items-center gap-3 cursor-pointer'>
        <img
          src={user.picture}
          alt='Profil'
          onClick={() => navigate(`/profile/${user.userid}`)}
          className='w-10 h-10 rounded-full object-cover border'
        />
        <div className='relative'>
          <button
            id='more'
            className='p-2 rounded-full hover:bg-gray-100 transition'
          >
            <EllipsisVertical className='text-gray-600' />
          </button>
          <Tooltip
            anchorSelect='#more'
            clickable={true}
            className='bg-white border rounded-md shadow-md overflow-hidden p-0'
          >
            <div className='w-56'>
              <Link
                to='/settings'
                className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition'
              >
                <Settings className='w-4 h-4' /> Paramètres
              </Link>
              <button
                onClick={() => dispatch(logoutUser())}
                className='flex items-center gap-2 px-4 py-2 w-full text-sm text-white bg-red-600 hover:bg-red-500 transition'
              >
                <LogOutIcon className='w-4 h-4' /> Se déconnecter
              </button>
            </div>
          </Tooltip>
        </div>
      </section>
    </header>
  );
};

export default NavBar;
