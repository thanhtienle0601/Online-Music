/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LayoutContext, SongContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AlbumCard from './AlbumCard';
const Album = () => {
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

  return (
    <div className="px-6 pt-6 mb-40 h-screen  rounded-md">
      <div className="flex items-center justify-between"></div>
      <div className="grid grid-cols-5 gap-5">
        {albums &&
          albums.length > 0 &&
          albums.map((album, index) => <AlbumCard key={index} album={album} />)}
      </div>
    </div>
  );
};

export default Album;
