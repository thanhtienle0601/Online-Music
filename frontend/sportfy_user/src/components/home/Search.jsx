/* eslint-disable no-unused-vars */
import { useEffect, useState, createContext, useContext } from 'react';
import Layout from '../../layout/Layout';

import Card from '../card/Card';
import Topbar from '../topbar/Topbar';
import axios from 'axios';
import Player from '../player/Player';
import { LayoutContext, SongContext } from '../../Context';
import ListSong from '../ListSong/ListSong';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import SignUp from '../sidebar/SignUp';

const Search = () => {
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
  ] = useContext(LayoutContext);

  return (
    <div className="px-6 pt-6 mb-40 h-screen  rounded-md">
      <div className="flex items-center justify-between"></div>
      <div className="grid grid-cols-5 gap-5">
        {listSongs &&
          listSongs.length > 0 &&
          listSongs.map((song, index) => <Card key={index} song={song} />)}
      </div>
    </div>
  );
};

export default Search;
