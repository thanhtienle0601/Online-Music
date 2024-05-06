/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { LayoutContext } from '../../Context';
import PlaylistCard from './PlaylistCard';

const Playlist = () => {
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
  ] = useContext(LayoutContext);

  return (
    <div className="px-6 pt-6 mb-40 h-screen  rounded-md">
      <div className="flex items-center justify-between"></div>
      <div className="grid grid-cols-5 gap-5">
        {playlists &&
          playlists.length > 0 &&
          playlists.map((playlist, index) => (
            <PlaylistCard key={index} playlist={playlist} />
          ))}
      </div>
    </div>
  );
};

export default Playlist;
