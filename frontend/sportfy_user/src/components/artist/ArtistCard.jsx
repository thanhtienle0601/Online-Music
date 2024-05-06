/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const ArtistCard = ({ artist }) => {
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
    artists,
    setArtists,
    artistId,
    setArtistId,
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
    console.log(artist.id);
    navigate(`/artist_details/${artist.id}`);
    setArtistId(artist.id);
    setType('artist');
  };
  return (
    <div className="flex flex-col p-3 text-white rounded-lg select-none bg-[#181818] card cursor-pointer h-[300px] overflow-hidden">
      <div className="relative" onClick={handleSelectedAlbum}>
        <img
          src={artist.photo}
          alt="img"
          className="rounded-md w-full h-[200px] object-cover"
        />
      </div>
      <p className="font_color mt-auto">{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
