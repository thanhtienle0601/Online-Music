/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToolTip from '../tooltip/ToolTip';
import { BiSolidUserCircle } from 'react-icons/bi';

const PremiumDetails = () => {
  const [packs, setPacks] = useState({});
  let session = JSON.parse(sessionStorage.getItem('account'));
  useEffect(() => {
    axios
      .request('http://localhost:8085/api/pack/findAll')
      .then((response) => {
        response.data;
        setPacks(response.data);
      })
      .catch((err) => {
        err;
      });
  }, []);
  packs;
  session;
  return (
    <div className="flex flex-col h-screen overflow-x-hidden bg-white">
      <header className="px-12 py-8 bg-black flex items-center justify-between">
        <Link to={'/'} className="logo">
          <img src="/assets/Spotify_Logo_RGB_White.png" alt="" width={120} />
        </Link>
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-semibold">
            {session.username || session.email}
          </span>
          {session.avt === null ? (
            <BiSolidUserCircle className="text-4xl cursor-pointer" />
          ) : (
            <img src={session.avt} className="w-10 h-10 rounded-full" />
          )}
        </div>
      </header>
      <div className=" w-full flex flex-col items-center bg-black h-[50%]">
        <div className="login-form flex flex-col items-center justify-center rounded-lg pb-20">
          <h1 className="text-center text-4xl font-bold my-20 text-white">
            Your Plan
          </h1>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
