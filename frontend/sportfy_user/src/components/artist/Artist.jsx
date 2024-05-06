/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AlbumCard from './ArtistCard';
import ArtistCard from './ArtistCard';
const Artist = () => {
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
  ] = useContext(LayoutContext);

  return (
    <div className="px-6 pt-6 mb-40 h-screen  rounded-md">
      <div className="flex items-center justify-between"></div>
      <div className="grid grid-cols-5 gap-5">
        {artists &&
          artists.length > 0 &&
          artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
      </div>
    </div>
  );
};

export default Artist;
