/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { BiSolidAlbum, BiSolidHome } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { VscLibrary } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import { RiGlobalLine } from 'react-icons/ri';
import { useContext } from 'react';
import { SongContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go';
import { GoHome } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';
import { BiSearchAlt } from 'react-icons/bi';
import { BiAlbum } from 'react-icons/bi';
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5';
import { PiMicrophoneStageFill, PiMicrophoneStageLight } from 'react-icons/pi';
// import Player from '../player/Player';
// import SignUp from '../sidebar/SignUp';

const Sidebar = () => {
  let session = sessionStorage.getItem('account');

  return (
    <div className="w-[20%] sidebar fixed top-2 left-2 pr-2">
      <div className="nav secondary_bg p-6 flex flex-col gap-y-4 rounded-lg">
        <div className="flex items-center gap-4  cursor-pointer">
          <NavLink to="/" className="">
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center gap-x-4">
                  <GoHomeFill className="text-2xl" />{' '}
                  <span className="text-base font-bold">Home</span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <GoHome className="text-2xl" />{' '}
                  <span className="text-base font_color font-bold">Home</span>
                </div>
              )
            }
          </NavLink>
          {/* <BiSolidHome className="text-xl font-bold" />
          <span className="sidebar_title font-bold font_color active_font ">
            Home
          </span> */}
        </div>
        <div className="flex items-center gap-4  cursor-pointer">
          <NavLink to="/search" className="">
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center gap-x-4">
                  <BiSearchAlt className="text-2xl font-bold" />
                  <span className="text-base font-bold">Search</span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <BiSearch className="text-2xl font_color" />
                  <span className="text-base font_color font-bold">Search</span>
                </div>
              )
            }
          </NavLink>
        </div>
        <div className="flex items-center gap-4  cursor-pointer">
          <NavLink to="/album" className="">
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center gap-x-4">
                  <BiSolidAlbum className="text-2xl font-bold" />
                  <span className="text-base font-bold">Album</span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <BiAlbum className="text-2xl font_color" />
                  <span className="text-base font_color font-bold">Album</span>
                </div>
              )
            }
          </NavLink>
        </div>
        <div className="flex items-center gap-4  cursor-pointer">
          <NavLink to="/playlist" className="">
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center gap-x-4">
                  <IoLibrary className="text-2xl font-bold" />
                  <span className="text-base font-bold">Playlist</span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <IoLibraryOutline className="text-2xl font_color" />
                  <span className="text-base font_color font-bold">
                    Playlist
                  </span>
                </div>
              )
            }
          </NavLink>
        </div>
        <div className="flex items-center gap-4  cursor-pointer">
          <NavLink to="/artist" className="">
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center gap-x-4">
                  <PiMicrophoneStageLight className="text-2xl font-bold" />
                  <span className="text-base font-bold">Artist</span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <PiMicrophoneStageFill className="text-2xl font_color" />
                  <span className="text-base font_color font-bold">Artist</span>
                </div>
              )
            }
          </NavLink>
        </div>
      </div>
      {/* <div className="your_library mt-2 secondary_bg p-6 flex flex-col gap-y-4 rounded-lg">
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <div className="flex gap-2 items-center">
            <VscLibrary className="text-xl font-bold" />
            <span className="sidebar_title font-bold font_color ">
              Your Library
            </span>
          </div>
          <button>
            <FaPlus className="font_color" />
          </button>
        </div>
        <div className="max-h-[200px] overflow-y-scroll h-full library_scroll">
          <div className="tertiary_bg p-6 rounded-lg leading-8">
            <p>Create your first playlist</p>
            <p>It's easy, we'll help you</p>
            <button className="rounded-full bg-white text-black mt-4 px-4 py-1 font-semibold text-sm">
              Create playlist
            </button>
          </div>
          <div className=" tertiary_bg p-6 rounded-lg leading-8 mt-4">
            <p>Create your first playlist</p>
            <p>It's easy, we'll help you</p>
            <button className="rounded-full bg-white text-black mt-4 px-4 py-1 font-semibold text-sm">
              Create playlist
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 p-6 flex gap-x-4 flex-wrap gap-y-6">
        <a className="text-xs font-medium text-gray-500" href="#">
          Legal
        </a>
        <a className="text-xs font-medium text-gray-500" href="#">
          Privacy Center
        </a>
        <a className="text-xs font-medium text-gray-500" href="#">
          Privacy Policy
        </a>
        <a className="text-xs font-medium text-gray-500" href="#">
          Cookies
        </a>
        <a className="text-xs font-medium text-gray-500" href="#">
          About Ads
        </a>
        <a className="text-xs font-medium text-gray-500" href="#">
          Accessibility
        </a>
      </div>
      <div className=" p-6">
        <button className="flex px-3 py-1 rounded-full border border-s-white items-center gap-1 font-semibold text-sm">
          <RiGlobalLine className="text-xl" />
          English
        </button>
      </div> */}
      {/* <SignUp /> */}
      {/* <Player /> */}
    </div>
  );
};

export default Sidebar;
