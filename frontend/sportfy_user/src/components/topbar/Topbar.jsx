/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { FaLessThan } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';
import { useHover } from '@uidotdev/usehooks';
import ToolTip from '../tooltip/ToolTip';
import UseClickOutSide from '../../hooks/UseClickOutSide';
import { LiaLessThanSolid } from 'react-icons/lia';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import { HiChevronLeft } from 'react-icons/hi2';
import { HiChevronRight } from 'react-icons/hi2';
import { LayoutContext, SongContext } from '../../Context';

const Topbar = () => {
  const [
    songs,
    handleFindSongById,
    selectedSong,
    setSelectedSong,
    isPlaying,
    setIsPlaying,
    isSearch,
    setIsSearch,
    setSearch,
    user,
    liked,
    setLiked,
    albums,
  ] = useContext(LayoutContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [account, setAccount] = useState(null);
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  useEffect(() => {
    setSearch(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  keyword;
  return (
    <div className="flex items-center p-4 justify-between sticky top-0 w-full bg-[#000000] z-10 rounded-tr-md rounded-tl-md">
      <div className="flex gap-x-4">
        <div
          className="bg-black rounded-full cursor-pointer text-xl text-center p-3"
          onClick={() => navigate(-1)}
        >
          <HiChevronLeft />
        </div>
        <div
          className="bg-black rounded-full cursor-pointer text-xl text-center p-3"
          onClick={() => navigate(1)}
        >
          <HiChevronRight />
        </div>
      </div>
      {location.pathname === '/search' && (
        <div>
          <input
            name="search"
            id="search"
            type="text"
            className="bg-[#151414] p-3 rounded-full border border-s-white w-[500px]"
            placeholder="What do you want to listen to ?"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      )}

      <div>
        {account === null ? (
          <div className="flex items-center gap-x-4">
            <Link
              to={'/signup'}
              className="rounded-full bg-black text-white px-6 py-3 font-bold "
            >
              Sign up
            </Link>
            <Link
              to={'/login'}
              className="rounded-full bg-white text-black px-8 py-2 font-bold "
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="flex gap-x-3 items-center">
            {!account.ispremium && (
              <NavLink
                className="bg-white rounded-full text-black text-sm font-semibold px-3 py-2 flex items-center justify-center"
                to="/premium"
              >
                Explore Premium
              </NavLink>
            )}
            <ToolTip text={account.fullname}>
              {account.avt === null ? (
                <BiSolidUserCircle className="text-4xl cursor-pointer" />
              ) : (
                <img src={account.avt} className="w-10 h-10 rounded-full" />
              )}
            </ToolTip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
