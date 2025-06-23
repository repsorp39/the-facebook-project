import React, { useState } from "react";
import SiteMark from "./SiteMark";
import {
  House,
  MessageCircleMore,
  Settings,
  UsersRound,
  Activity,
  LogOutIcon,
  BellRing,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/features/user-slice";

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
    path: "/friends",
    label: "Contacts",
    icon: <UsersRound />,
  },
  {
    path: "/activities",
    label: "Activités",
    icon: <Activity />,
  },
  {
    path: "/notifications",
    label: "Notifications",
    icon: <BellRing />,
  },
  {
    path: "/settings",
    label: "Paramètres",
    icon: <Settings />,
  },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  const toogleVisibility = () => setIsSideBarHidden(!isSideBarHidden);

  return (
    <section
      className={`h-full px-2 items-center content-center bg-slate-50 shadow-lg transition-all ease-linear fixed left-0 ${
        isSideBarHidden ? "w-[60px]" : "w-[280px]"
      }`}
    >
      <div>{!isSideBarHidden && <SiteMark />}</div>
      <nav>
        <ul
          className={
            isSideBarHidden
              ? "flex flex-col items-center content-center [&_a]:p-3"
              : ""
          }
        >
          {items.map((item) => {
            return (
              <li
                key={item.label}
                id={item.label}
                className='mb-3 py-2 rounded-md [&_a]:py-2 overflow-y-auto'
              >
                <NavLink
                  className={(navlink) =>
                    navlink.isActive
                      ? "flex gap-3 text-[16px] text-black rounded-sm bg-blue-500"
                      : "flex gap-3 text-[16px] text-black hover:bg-blue-600"
                  }
                  to={item.path}
                >
                  <span className='block'> {item.icon} </span>
                  {!isSideBarHidden && item.label}
                </NavLink>
                {isSideBarHidden && (
                  <Tooltip
                    anchorSelect={`#${item.label}`}
                    content={item.label}
                  />
                )}
              </li>
            );
          })}
          <hr className='h-[1px] text-black' />
          <li className='mb-5 py-2 rounded-sm hover:bg-red-500 hover:text-white'>
            <NavLink
              className='flex gap-3 text-[16px] text-red-800 hover:text-white'
              to='/logout'
              onClick={(e) => {
                e.preventDefault();
                dispatch(logoutUser());
              }}
            >
              <span className='block'>
                <LogOutIcon />
              </span>
              {!isSideBarHidden && "Logout"}
            </NavLink>
          </li>
        </ul>
        {!isSideBarHidden ? (
          <PanelLeftClose
            id='close-panel'
            onClick={toogleVisibility}
            className='absolute bottom-0 right-0 m-2 cursor-pointer'
          />
        ) : (
          <PanelLeftOpen
            id='open-panel'
            onClick={toogleVisibility}
            className='absolute bottom-0 right-0 m-2 cursor-pointer'
          />
        )}
      </nav>
    </section>
  );
};

export default SideBar;
