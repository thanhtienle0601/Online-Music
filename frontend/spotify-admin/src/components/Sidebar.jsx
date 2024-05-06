/* eslint-disable no-unused-vars */
import { Link, NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsFileMusic } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { PiMicrophoneStageBold } from 'react-icons/pi';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BiCategoryAlt } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { BsSpotify } from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageListClasses } from '@mui/material';
import { GoPackage } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';

const Sidebar = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem('account');
    navigate('/login');
  };
  return (
    <div className="h-full px-3 flex flex-col">
      <div className="flex items-center py-4 gap-x-4">
        <BsSpotify className="text-4xl font-bold text-green-500" />
        <h1 className="font-bold text-2xl">Spotify Admin</h1>
      </div>
      <div className="flex-1 my-4">
        <div className="flex flex-col gap-y-4">
          {/* <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
          >
            <LuLayoutDashboard className="text-xl font-bold" />
            Dashboard
          </NavLink> */}
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/album"
          >
            <BsFileMusic className="text-xl font-bold" />
            Album
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/song"
          >
            <BsFileMusic className="text-xl font-bold" />
            Song
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/genre"
          >
            <BiCategoryAlt className="text-xl font-bold" />
            Genre
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/artist"
          >
            <PiMicrophoneStageBold className="text-xl font-bold" />
            Artist
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/pack"
          >
            <GoPackage className="text-xl font-bold" />
            Pack
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/user"
          >
            <FaUsers className="text-xl font-bold" />
            User
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
                : 'flex items-center justify-start gap-2 hover:bg-[#ffffff30] px-2 py-2 rounded-md '
            }
            to="/invoice"
          >
            <LiaFileInvoiceDollarSolid className="text-xl font-bold" />
            Invoice
          </NavLink>
        </div>
      </div>
      <div className="border-t border-green-600 py-3 flex items-center justify-between gap-x-2">
        {/* <div>
          <img src="" alt="" />
          {!account.avt ? (
            <BiSolidUserCircle className="text-4xl" />
          ) : (
            <img src={account.avt} alt="" className="w-10 h-10" />
          )}
        </div> */}
        <div className="flex flex-col">
          <span>{account.username}</span>
          <span className="text-xs">{account.email}</span>
        </div>
        <button onClick={handleLogout}>
          <BiLogOut className="text-2xl font-semibold" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
