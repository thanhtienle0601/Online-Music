/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './Home.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from '../components/topbar/Topbar';
import { LayoutContext } from '../Context';
import Sidebar from '../components/sidebar/Sidebar';
import SignUp from '../components/sidebar/SignUp';
import Player from '../components/player/Player';
import axios from 'axios';

// eslint-disable-next-line react/prop-types, no-unused-vars
const Layout = () => {
  let session = sessionStorage.getItem('account');
  function LayoutProvider(props) {
    const [user, setUser] = useState();
    useEffect(() => {
      if (session) {
        setUser(JSON.parse(session));
      }
    }, []);

    const [isSearch, setIsSearch] = useState(false);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [albumId, setAlbumId] = useState(0);
    const [playlistId, setPlaylistId] = useState(0);
    const [selectedSong, setSelectedSong] = useState();
    const [playingSong, setPlayingSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    const [search, setSearch] = useState();
    const [songsByAlbum, setSongsByAlbum] = useState([]);
    const [listSongs, setListSongs] = useState([]);
    const [isPlayingAlum, setIsPlayingAlum] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [artistId, setArtistId] = useState(0);
    const [homeSongs, setHomeSongs] = useState([]);
    const [type, setType] = useState();

    const handleFindSongById = (songId) => {
      let song = homeSongs.find((song) => song.id === songId);
      setSelectedSong(song);
      setPlayingSong(song);
    };

    useEffect(() => {
      if (search && search !== undefined) {
        axios(`http://localhost:8085/api/song/findByKeyword/${search}`).then(
          (response) => {
            response.data;
            setListSongs(response.data);
            // setSelectedSong(response.data);
            // (songs);
          }
        );
      } else {
        axios('http://localhost:8085/api/song/findAll2').then((response) => {
          response.data;
          setHomeSongs(response.data);
          setSelectedSong(playingSong);
        });
        axios('http://localhost:8085/api/album/findAll').then((response) => {
          console.log(response.data);
          setAlbums(response.data);
        });
        axios('http://localhost:8085/api/playlist/findAll').then((response) => {
          console.log(response.data);
          setPlaylists(response.data);
        });
        axios('http://localhost:8085/api/artist/findAll').then((response) => {
          console.log(response.data);
          setArtists(response.data);
        });
      }
    }, [playingSong, search]);

    useEffect(() => {
      if (albumId === 'undefined') {
        return null;
      } else {
        axios
          .get(`http://localhost:8085/api/song/findByAlbumId/${albumId}`)
          .then((response) => {
            response.data;
            setSongs(response.data);
            // (songs);
          });
      }
    }, [albumId]);

    useEffect(() => {
      if (playlistId === 'undefined') {
        return null;
      } else {
        axios
          .get(
            `http://localhost:8085/api/playlistSong/findSongsByPlaylistId/${playlistId}`
          )
          .then((response) => {
            response.data;
            setSongs(response.data);
            // (songs);
          });
      }
    }, [playlistId]);

    useEffect(() => {
      if (artistId === 'undefined') {
        return null;
      } else {
        axios
          .get(`http://localhost:8085/api/song/findByArtistId/${artistId}`)
          .then((response) => {
            response.data;
            setSongs(response.data);
            // (songs);
          });
      }
    }, [artistId]);

    return (
      <LayoutContext.Provider
        value={[
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
        ]}
        {...props}
      ></LayoutContext.Provider>
    );
  }
  return (
    <LayoutProvider>
      <div className="flex gap-x-3 p-2 h-screen">
        <div className="w-1/5 bg-[#121212] rounded-md">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-[#121212] rounded-md overflow-y-scroll">
          <Topbar />
          <Outlet />
          {!session ? <SignUp /> : <Player />}
        </div>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
