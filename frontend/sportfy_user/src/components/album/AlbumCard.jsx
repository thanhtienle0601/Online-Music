/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const AlbumCard = ({ album }) => {
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
    // setAlbumId(album.id);
    navigate(`/album_details/${album.id}`);
    setAlbumId(album.id);
    setType('album');
    // if (song.ispremium === true && account.ispremium === false) {
    //   enqueueSnackbar('Please Upgrade your Account !', {
    //     variant: 'info',
    //   });
    // } else {
    //   // (song.id);
    //   if (selectedSong.id === song.id) {
    //     setIsPlaying(!isPlaying);
    //     handleFindSongById(song.id);
    //     setLiked(selectedSong.liked);
    //   } else {
    //     setIsPlaying(true);
    //     handleFindSongById(song.id);
    //     setLiked(selectedSong.liked);
    //   }
    // }
  };
  return (
    <div className="flex flex-col p-3 text-white rounded-lg select-none bg-[#181818] card cursor-pointer h-[300px] overflow-hidden">
      <div className="relative" onClick={handleSelectedAlbum}>
        <img
          src={album.photo}
          alt="img"
          className="rounded-md w-full h-[150px] object-cover"
        />

        {/* <button
            className=" bg-green-500 p-4 flex items-center justify-center rounded-full absolute bottom-2 right-2"
            // onClick={}
          >
            <FaPause className="text-black" />
          </button>
      */}
        {/* <button className="btn bg-green-500 p-4 flex items-center justify-center rounded-full absolute bottom-0 right-2 opacity-0 invisible">
          <FaPlay className="text-black" />
        </button> */}
      </div>
      <h3 className="my-3 font-bold mt-3">{album.name}</h3>
      <div className=" mt-auto">
        <span className="font-bold text-sm font_color">
          {album.description}
        </span>
        <p className="font_color">{album.artist_name}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
