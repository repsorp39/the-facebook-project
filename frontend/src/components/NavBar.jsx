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
      path: "/discussions",
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
    <header className='flex justify-between items-center bg-slate-50 h-16 shadow-md fixed top-0 w-full z-20'>
      <section className='flexitems-center'>
        <div>
          <img src={logo} className='w-44' alt='' />
        </div>
        <div></div>
      </section>
      <section className='w-1/3'>
        <ul className='flex items-center gap-4 justify-between'>
          {items.map((item, index) => {
            return (
              <>
                <li
                  key={item.label}
                  className={`[&_svg]:text-black p-4 ${
                    pathname === item.path ? "activeLink" : ""
                  }`}
                >
                  <NavLink
                    to={item.path}
                    className='h-full w-full'
                    key={index}
                    id={item.label}
                  >
                    {item.icon}
                  </NavLink>
                </li>
                <Tooltip anchorSelect={`#${item.label}`} content={item.label} />
              </>
            );
          })}
        </ul>
      </section>

      <section
        className='flex items-center content-center cursor-pointer'
        onClick={() => navigate(`/profile/${user.userid}`)}
      >
        <figure className='image is-48x48'>
          <img className='is-rounded' src={user.picture} alt='' />
        </figure>
        <div>
          <li id='more'>
            <button>
              <EllipsisVertical />
            </button>
          </li>
          <Tooltip
            anchorSelect='#more'
            className='p-0 shadow-sm'
            clickable={true}
          >
            <div className='w-[220px]  bg-slate-300 '>
              <div>
                <Link to='/settings' className='flex text-black gap-1 p-2 '>
                  <Settings /> Paramètres
                </Link>
              </div>
              <div>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className='flex w-full text-white gap-1 p-2 bg-red-600 hover:bg-red-500'
                >
                  <LogOutIcon /> Se déconnecter
                </button>
              </div>
            </div>
          </Tooltip>
        </div>
      </section>
    </header>
  );
};

export default NavBar;
