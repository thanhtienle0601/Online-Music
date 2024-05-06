/* eslint-disable no-unused-vars */
// import Topbar from '../topbar/Topbar';
import { useContext, useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  NavLink,
  useParams,
} from 'react-router-dom';
import ToolTip from '../tooltip/ToolTip';
import { BiSolidUserCircle } from 'react-icons/bi';
import axios from 'axios';
import { SongContext } from '../../Context';

const Profile = () => {
  // const [account, setAccount] = useState(null);
  let session = JSON.parse(sessionStorage.getItem('account'));
  // useEffect(() => {
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, []);
  return (
    <div className="flex gap-x-3 items-center">
      <div className="p-6">
        {session.avt === null ? (
          <BiSolidUserCircle className="text-9xl cursor-pointer" />
        ) : (
          <img src={session.avt} className="w-[100px] h-[100px] rounded-full" />
        )}
      </div>
      <div className="flex flex-col justify-between gap-y-4">
        <span className="text-sm">Profile</span>
        <span className="text-4xl font-bold">
          {session.username || 'Username Here'}
        </span>
        <span className="text-sm">{session.email}</span>
      </div>
    </div>
  );
};

export default Profile;
