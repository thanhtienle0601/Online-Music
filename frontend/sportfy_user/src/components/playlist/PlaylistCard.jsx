/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaHeart, FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const PlaylistCard = ({ playlist }) => {
  const { enqueueSnackbar } = useSnackbar();
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
    playingSong,
    albumId,
    setAlbumId,
    songsByAlbum,
    setSongsByAlbum,
    listSongs,
    setListSongs,
    isPlayingAlum,
    setIsPlayingAlum,
    playlists,
    setPlaylists,
    playlistId,
    setPlaylistId,
    homeSongs,
    type,
    setType,
  ] = useContext(LayoutContext);
  const [account, setAccount] = useState();
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    setAccount(JSON.parse(session));
  }, []);

  const navigate = useNavigate();
  const handleSelectedAlbum = () => {
    if (!account) {
      navigate('/login');
    }
    navigate(`/playlist_details/${playlist.id}`);
    setPlaylistId(playlist.id);
    setType('playlist');
    console.log(playlist.id);
  };
  return (
    <div className="flex flex-col p-3 text-white rounded-lg items-center gap-y-5 select-none bg-[#181818] card cursor-pointer h-[200px] overflow-hidden">
      <div className="relative" onClick={handleSelectedAlbum}>
        <div>
          <FaHeart className="text-8xl" />
        </div>
      </div>
      <div>
        <h3 className="my-3 font-bold mt-3 capitalize">{playlist.name}</h3>
        {/* <span className="text-sm font-semibold text-slate-500 text-center block">
          1 Song
        </span> */}
      </div>
    </div>
  );
};

export default PlaylistCard;
