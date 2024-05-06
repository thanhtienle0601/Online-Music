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

const ArtistDetails = () => {
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
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [artistSongs, setArtistSongs] = useState([]);
  const [idSong, setIdSong] = useState();
  const handlePlayAlbum = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      // setSelectedSong(albumSongs[0]);
      setIsPlayingAlum(true);
      console.log(true);
    } else {
      console.log(false);
      setSelectedSong(artistSongs[0]);
      setIsPlaying(!isPlaying);
      setIsPlayingAlum(!isPlayingAlum);
    }
    // console.log(albumSongs);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/artist/find/${id}`)
      .then((res) => {
        console.log(res.data);
        setArtist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/song/findByArtistId/${id}`)
      .then((res) => {
        console.log(res.data);
        setArtistSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div className="p-6 bg-linear h-screen">
        <div className="flex items-center ">
          <div className="py-6 mr-6 shadow-lg">
            <img
              src={artist.photo}
              alt="album_photo"
              className="w-[250px] h-[250px]"
            />
          </div>
          <div className="flex flex-col items-start  h-[250px] justify-between">
            <span className="text-sm font-semibold mt-5">Artist</span>
            <h3 className="text-6xl font-bold">{artist.name}</h3>
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
              {/* <th className="text-start sticky  pb-10 pt-5 pl-5 w-[5%]">
                <FaRegClock className="font-semibold text-slate-500" />
              </th> */}
            </tr>
          </thead>
          <tbody className="mt-5 pt-5">
            {artistSongs &&
              artistSongs.map((song, index) => (
                <tr
                  key={song.id}
                  className={`py-2 hover:bg-[#ffffff30] cursor-pointer ${
                    selectedSong &&
                    selectedSong.id === song.id &&
                    'bg-[#ffffff30] text-green-500'
                  } 
                `}
                  onClick={() => {
                    setType('artist');
                    setIdSong(song.id);
                    setSelectedSong(artistSongs[index]);
                    setIsPlaying(true);
                  }}
                >
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md text-slate-500">
                    {index + 1}
                  </td>

                  <td className="py-2 px-5 rounded-tr-md rounded-br-md">
                    <div className="flex flex-col gap-y-2">
                      <span>{song.title}</span>
                      <span className="text-sm text-slate-500">
                        {song.artist_name}
                      </span>
                    </div>
                  </td>
                  {/* <td className="py-2 px-5 text-slate-500">
                  <ReactAudioPlayer
                    src={song.url}
                    controls
                    className="opacity-0 invisible hidden"
                  />
                  {time}
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistDetails;
