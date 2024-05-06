/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const Card = ({ song }) => {
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
  const handleSelectedSong = () => {
    if (!account) {
      navigate('/login');
    }
    if (song.ispremium === true && account.ispremium === false) {
      enqueueSnackbar('Please Upgrade your Account !', {
        variant: 'info',
      });
    } else {
      setType('song');
      // (song.id);
      if (selectedSong.id === song.id) {
        setIsPlaying(!isPlaying);
        handleFindSongById(song.id);
        setLiked(selectedSong.liked);
      } else {
        setIsPlaying(true);
        handleFindSongById(song.id);
        setLiked(selectedSong.liked);
      }
    }
  };
  return (
    <div className="flex flex-col p-3 text-white rounded-lg select-none bg-[#181818] card cursor-pointer h-[300px] overflow-hidden">
      <div className="relative">
        {song.ispremium && (
          <div className="absolute top-1 right-1 w-15 h-6 bg-green-600 text-xs font-semibold p-1 rounded-md">
            Premium
          </div>
        )}
        <img
          src={song.album_photo || song.photo}
          alt="img"
          className="rounded-md w-full h-[150px] object-cover"
        />
        {isPlaying && selectedSong && selectedSong.id === song.id ? (
          <button
            className=" bg-green-500 p-4 flex items-center justify-center rounded-full absolute bottom-2 right-2"
            onClick={handleSelectedSong}
          >
            <FaPause className="text-black" />
          </button>
        ) : (
          <button
            className="btn bg-green-500 p-4 flex items-center justify-center rounded-full absolute bottom-0 right-2 opacity-0 invisible"
            onClick={handleSelectedSong}
          >
            <FaPlay className="text-black" />
          </button>
        )}
      </div>
      <h3 className="my-3 font-bold mt-3">{song.title || song.name}</h3>
      <div className=" mt-auto">
        {song.description && (
          <span className="font-bold text-sm font_color">
            {song.description}
          </span>
        )}
        <p className="font_color">{song.artist_name}</p>
      </div>
    </div>
  );
};

export default Card;
