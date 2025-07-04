import React from "react";
import logo from "../assets/images/brandmark.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/features/user-slice";

import { Settings, EllipsisVertical, LogOutIcon } from "lucide-react";
import { FcStatistics } from "react-icons/fc";
import {
  MdAdminPanelSettings,
  MdOutlineGroups3,
  MdOutlineSecurity,
  MdPublic,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";



const AdminNavBar = () => {
  const user = useSelector((state) => state.auth.userinfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isModerator = useSelector((state) => state.auth.isModerator);

  return (
    <header className='fixed top-0 w-full h-16 bg-white shadow-sm z-20 flex items-center justify-between px-6 border-b border-gray-200'>
      {/* Logo & Role */}
      <section className='flex items-center gap-6'>
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt='Logo'
          className='w-36 h-auto object-contain cursor-pointer'
        />

        {isAdmin ? (
          <div className='flex items-center gap-2 text-sm font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-md'>
            <MdAdminPanelSettings className='text-red-400 w-6 h-6' /> Admin
          </div>
        ) : isModerator ? (
          <div className='flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md'>
            <MdOutlineSecurity className='text-emerald-600' />
            Modérateur
          </div>
        ) : (
          ""
        )}
      </section>

      {/* Navigation liens */}
      <ul className='flex items-center gap-6 text-gray-700 text-sm font-medium'>
        <NavLink
          to='/moderator/users'
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
              isActive ? "text-blue-600 bg-blue-50" : ""
            }`
          }
        >
          <HiUsers className='w-5 h-5' />
          Utilisateurs
        </NavLink>

        <NavLink
          to='/moderator/posts'
          className={({ isActive }) =>
            `flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
              isActive ? "text-blue-600 bg-blue-50" : ""
            }`
          }
        >
          <MdPublic className='w-5 h-5' />
          Articles
        </NavLink>

        {isAdmin && (
          <>
            <NavLink
              to='/admin/moderators'
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                  isActive ? "text-blue-600 bg-blue-50" : ""
                }`
              }
            >
              <MdOutlineGroups3 className='w-5 h-5' />
              Modérateurs
            </NavLink>
            <NavLink
              to='/admin/statistics'
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                  isActive ? "text-blue-600 bg-blue-50" : ""
                }`
              }
            >
              <FcStatistics className='w-5 h-5' />
              Statistiques
            </NavLink>
          </>
        )}
      </ul>

      <section className='flex items-center gap-3'>
        <img
          src={user.picture}
          alt='Profil'
          onClick={() => navigate(`/profile/${user.userid}`)}
          className='w-10 h-10 rounded-full object-cover border cursor-pointer'
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

export default AdminNavBar;
