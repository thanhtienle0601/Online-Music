/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../Context';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaRegClock,
  FaRegTrashAlt,
} from 'react-icons/fa';
import ReactAudioPlayer from 'react-audio-player';
import { useHover } from '@uidotdev/usehooks';
import { IoIosPlay } from 'react-icons/io';

const PlaylistDetails = () => {
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
    type,
    setType,
  ] = useContext(LayoutContext);
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [idSong, setIdSong] = useState();
  const handlePlayAlbum = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      // setSelectedSong(albumSongs[0]);
      setIsPlayingAlum(true);
      console.log(true);
    } else {
      console.log(false);
      setSelectedSong(playlistSongs[0]);
      setIsPlaying(!isPlaying);
      setIsPlayingAlum(!isPlayingAlum);
    }
    // console.log(albumSongs);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/playlist/find/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlaylist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/playlistSong/findSongsByPlaylistId/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlaylistSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDeletePlaylistSong = (playlistSongId) => {
    axios
      .delete(`http://localhost:8085/api/playlistSong/delete/${playlistSongId}`)
      .then((res) => {
        console.log(res);
        let index = playlistSongs
          .map((song) => song.id)
          .indexOf(playlistSongId);
        setPlaylistSongs(...playlistSongs, playlistSongs.splice(index, 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="p-6 bg-linear h-screen">
        <div className="flex items-center ">
          <div className="py-6 mr-6 shadow-lg bg-linear2 p-3 w-[250px] h-[250px] flex items-center justify-center">
            <FaHeart className="text-9xl" />
          </div>
          <div className="flex flex-col items-start  gap-y-10 justify-between">
            <span className="text-sm font-semibold">Playlist</span>
            <h3 className="text-7xl font-bold">{playlist.name}</h3>
            <div className="flex items-center gap-3">
              <img
                src={user && user.avt}
                alt="artist_photo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-semibold">
                {playlist.user_username}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00000050] w-full -translate-y-[60%] h-screen p-6">
        <div>
          {isPlaying ? (
            <button
              className="btn bg-green-500 p-4 flex items-center justify-center rounded-full hover:scale-105"
              onClick={handlePlayAlbum}
            >
              <FaPause className="text-black" />
            </button>
          ) : (
            <button
              className="btn bg-green-500 p-4 flex items-center justify-center rounded-full hover:scale-105"
              onClick={handlePlayAlbum}
            >
              <FaPlay className="text-black " />
            </button>
          )}
        </div>
        {/* <div className="flex mt-5 items-center justify-between">
          <div>
            <span className="font-semibold text-slate-500 mr-5">#</span>
            <span className="font-semibold text-slate-500">Title</span>
          </div>
          <span>
            <FaRegClock className="font-semibold text-slate-500" />
          </span>
        </div> */}
        <table className="w-full rounded-lg table-auto">
          <thead className="border-b-[1px] border-slate-500">
            <tr>
              <th className="text-start sticky pb-3  pt-5 pl-5 text-slate-500 w-[5%]">
                #
              </th>
              <th className="text-start sticky pb-3  pt-5 pl-5 text-slate-500">
                Title
              </th>
              {/* <th className="text-start sticky pb-3  pt-5 pl-5 text-slate-500 w-[10%]">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="mt-5 pt-5">
            {playlistSongs.map((song, index) => (
              <tr
                key={song.id}
                className={`py-2 hover:bg-[#ffffff30] cursor-pointer ${
                  selectedSong &&
                  selectedSong.title === song.title &&
                  'bg-[#ffffff30] text-green-500'
                } 
                `}
              >
                <td className="py-2 px-5 rounded-tl-md rounded-bl-md text-slate-500">
                  {index + 1}
                </td>

                <td
                  className="py-2 px-5 rounded-tr-md rounded-br-md"
                  onClick={() => {
                    setType('playlist');
                    setIdSong(song.id);
                    setSelectedSong(playlistSongs[index]);
                    setIsPlaying(true);
                    console.log(song);
                    console.log(selectedSong);
                  }}
                >
                  <div className="flex flex-col gap-y-2 ">
                    <span>{song.title}</span>
                    <span className="text-sm text-slate-500">
                      {song.artist_name}
                    </span>
                  </div>
                </td>
                {/* <td className="py-2 px-5 text-slate-500 rounded-tr-md rounded-br-md">
                  <FaRegTrashAlt
                    onClick={() => {
                      handleDeletePlaylistSong(song.id);
                    }}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistDetails;
