/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { GiPreviousButton } from 'react-icons/gi';
import { GiNextButton } from 'react-icons/gi';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BsFillPauseCircleFill } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { TbArrowsShuffle } from 'react-icons/tb';
import { TbRepeatOnce } from 'react-icons/tb';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext, SongContext } from '../../Context';
import axios from 'axios';
import { useSnackbar } from 'notistack';
// import { useContext } from 'react';

const Player = () => {
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
  // setListSongs(songs);
  // console.log(listSongs);

  const [isMuted, setIsMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [sound, setSound] = useState(100);
  const [likedSong, setLikedSong] = useState(!liked);
  const { enqueueSnackbar } = useSnackbar();

  let session = JSON.parse(sessionStorage.getItem('account'));

  const audioRef = useRef();
  // (audioRef);
  const clickRef = useRef();
  const clickRefVolume = useRef();
  useEffect(() => {
    if (!isPlaying && audioRef.current.played) {
      audioRef.current.pause();
    } else if (isPlaying && audioRef.current.paused) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (shuffle) {
      shuffleMethod(songs);
    }
  }, [shuffle, songs]);

  const getRandomSong = (sources, max) => {
    return sources[Math.floor(Math.random() * max)];
  };

  function shuffleMethod(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsPlayingAlum(!isPlaying);
  };
  const handlePrev = () => {
    if (session.ispremium) {
      if (type === 'album' || type === 'playlist' || type === 'artist') {
        if (shuffle) {
          setSelectedSong(getRandomSong(songs, songs.length));
          setIsPlaying(true);
        } else {
          let index = songs.map((song) => song.id).indexOf(selectedSong.id);
          if (index === 0) {
            index = songs.length;
          }
          setSelectedSong(songs[index - 1]);
          setIsPlaying(true);
        }
      } else {
        if (shuffle) {
          setSelectedSong(getRandomSong(homeSongs, homeSongs.length));
          setIsPlaying(true);
        } else {
          let index = homeSongs.map((song) => song.id).indexOf(selectedSong.id);
          if (index === 0) {
            index = homeSongs.length;
          }
          setSelectedSong(homeSongs[index - 1]);
          setIsPlaying(true);
        }
      }
    } else {
      enqueueSnackbar('Please Upgrade your Account !', {
        variant: 'info',
      });
    }
  };
  const handleNext = () => {
    if (session.ispremium) {
      if (type === 'album' || type === 'playlist' || type === 'artist') {
        if (shuffle) {
          setSelectedSong(getRandomSong(songs, songs.length));
          setIsPlaying(true);
        } else {
          let index = songs.map((song) => song.id).indexOf(selectedSong.id);
          if (index === songs.length - 1) {
            index = -1;
          }
          setSelectedSong(songs[index + 1]);
          setIsPlaying(true);
          console.log(true);
        }
      } else {
        if (shuffle) {
          setSelectedSong(getRandomSong(homeSongs, homeSongs.length));
          setIsPlaying(true);
        } else {
          let index = homeSongs.map((song) => song.id).indexOf(selectedSong.id);
          if (index === songs.length - 1) {
            index = -1;
          }
          setSelectedSong(homeSongs[index + 1]);
          setIsPlaying(true);
        }
      }
    } else {
      enqueueSnackbar('Please Upgrade your Account !', {
        variant: 'info',
      });
    }
  };

  const updateSongLiked = (newSong) => {
    setSelectedSong(newSong);
  };

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;
    // (duration, ct);
    setSelectedSong({
      ...selectedSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
    // (selectedSong.progress);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioRef.current.currentTime = (divProgress / 100) * selectedSong.length;

    // (width, offset);
  };

  function formatSecondsAsTime(secs) {
    // var hr = Math.floor(secs / 3600);
    var min = Math.floor(secs / 60);
    var sec = Math.floor(secs - min * 60);

    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }

    return min + ':' + sec;
  }
  // (formatSecondsAsTime(selectedSong.progress));

  const handleTime = (e) => {
    const value = e.target.value;
    // const volume = value / 100;
    // setSound(value);
    audioRef.current.currentTime = (value / 100) * selectedSong.length;
    // (value, volume);
    value;
  };

  const handleMuted = () => {
    setIsMuted(!isMuted);
    // if (!isMuted) {
    //   audioRef.current.volume = 0;
    // } else {
    //   audioRef.current.volume = sound;
    //   (sound);
    // }
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    const volume = value / 100;
    setSound(value);
    audioRef.current.volume = volume;
    // (value, volume);
  };

  const checkWidthVolume = (e) => {
    const defaultVolume = 0.5;
    let width = clickRefVolume.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const volume = offset / width;
    const divProgress = (offset / width) * 100;
    audioRef.current.volume = volume;
    setSound(divProgress);

    // (divProgress, volume);
  };
  // const getRandomSong = (max) => {
  //   return songs[Math.floor(Math.random() * max)];
  // };

  // console.log(getRandomSong(songs.length));

  const handleCreatePlaylist = () => {
    const playlistDto = {
      name: 'liked song',
      user_id: session.id,
    };
    axios
      .post(`http://localhost:8085/api/playlist/create`, playlistDto)
      .then((response) => {
        console.log(response.data.playlist.id);
        handleCreatePlaylistSong(response.data.playlist.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreatePlaylistSong = (playlistId) => {
    const playlistSongDto = {
      playlist_id: playlistId,
      song_id: selectedSong.id,
    };
    axios
      .post(`http://localhost:8085/api/playlistSong/create`, playlistSongDto)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePlaylistSong = (id) => {
    axios
      .delete(`http://localhost:8085/api/playlistSong/delete/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFindPlaylist = () => {
    axios
      .get(
        `http://localhost:8085/api/playlist/findByUserIdAndName/${session.id}/liked song`
      )
      .then((response) => {
        if (response.data) {
          handleCreatePlaylistSong(response.data.id);
          console.log(response.data);
        } else {
          handleCreatePlaylist();
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (liked) {
  //   handleFindPlaylist();
  // }

  const handleEditSong = (id, title, ispremium, liked, album_id, genre_id) => {
    const songDto = {
      id,
      title,
      ispremium,
      liked,
      album_id,
      genre_id,
    };
    const json = JSON.stringify(songDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('songDto', blob);
    formData.append('photo', new File([''], session.photo));
    formData.append('songFile', new File([''], session.url));
    for (var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    axios
      .put('http://localhost:8085/api/song/update', formData)
      .then((response) => {
        console.log(response);
        findSongById(selectedSong.id);
        // window.location.reload(false);
      })
      .catch((error) => {
        // alert('An error happened. Please check console');
        console.log(error);
        return false;
      });
  };

  const findSongById = (id) => {
    axios
      .get(`http://localhost:8085/api/song/find/${id}`)
      .then((response) => {
        console.log(response.data.liked);
        if (response.data.liked) {
          handleFindPlaylist();
        }
        const new_selectedSong = {
          ...selectedSong,
          liked: response.data.liked,
        };
        setSelectedSong(new_selectedSong);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`bg-black h-24 z-50 fixed bottom-0 left-0 flex justify-between items-center gap-x-10 px-4 w-full`}
    >
      {/* {isPlaying ? (
        <audio
          hidden
          src={selectedSong ? selectedSong.url : null}
          autoPlay
          ref={audioRef}
          onTimeUpdate={onPlaying}
          muted={isMuted}
          // controls
        />
      ) : (
        <audio
          hidden
          src={selectedSong ? selectedSong.url : null}
          ref={audioRef}
          onTimeUpdate={onPlaying}
          muted={isMuted}
          // controls
        />
      )} */}
      <audio
        hidden
        src={selectedSong ? selectedSong.url : null}
        autoPlay={isPlaying}
        ref={audioRef}
        onTimeUpdate={onPlaying}
        muted={isMuted}
        loop={repeat}
        onEnded={handleNext}
        // controls
      />
      <div className="flex items-center gap-x-4 w-[350px]">
        <img
          src={selectedSong ? selectedSong.album_photo : null}
          className="w-[80px] h-[80px] object-contain  rounded-sm"
          alt=""
        />
        <div className="flex flex-col gap-y-1">
          <span className="font-semibold text-sm">
            {selectedSong ? selectedSong.title : null}
          </span>
          <span className="font-light text-xs text-gray-400">
            {selectedSong ? selectedSong.artist_name : null}
          </span>
        </div>
        <span
          onClick={() => {
            setLikedSong(!likedSong);
            handleEditSong(
              selectedSong.id,
              selectedSong.title,
              selectedSong.ispremium,
              true,
              selectedSong.album_id,
              selectedSong.genre_id
            );

            // findSongById(selectedSong.id);
          }}
        >
          {selectedSong && selectedSong.liked ? (
            <FaHeart className=" text-green-500" />
          ) : (
            <FaRegHeart className="cursor-pointer opacity-50 hover:opacity-100" />
          )}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex items-center gap-x-6">
          <TbArrowsShuffle
            className={`text-2xl opacity-50 hover:opacity-100 ${
              shuffle ? 'text-green-500 opacity-100' : ''
            }`}
            onClick={() => {
              setShuffle(!shuffle);
            }}
          />
          <GiPreviousButton
            className="text-2xl opacity-50 hover:opacity-100"
            onClick={handlePrev}
          />
          {!isPlaying ? (
            <BsFillPlayCircleFill
              className="text-4xl hover:scale-105"
              onClick={handlePlayPause}
            />
          ) : (
            <BsFillPauseCircleFill
              className="text-4xl hover:scale-105"
              onClick={handlePlayPause}
            />
          )}
          <GiNextButton
            className="text-2xl opacity-50 hover:opacity-100"
            onClick={handleNext}
          />
          <TbRepeatOnce
            className={`text-2xl opacity-50 hover:opacity-100 ${
              repeat ? 'text-green-500 opacity-100' : ''
            }`}
            onClick={() => {
              setRepeat(!repeat);
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <span className="w-10">
            {selectedSong && selectedSong.progress
              ? formatSecondsAsTime(audioRef.current.currentTime)
              : '-:--'}
          </span>

          <div
            className="group w-[500px] h-1 rounded-sm bg-[#ffffff50] relative cursor-pointer"
            ref={clickRef}
            onClick={checkWidth}
          >
            <input
              value={
                selectedSong && selectedSong.progress
                  ? selectedSong.progress
                  : 0
              }
              type="range"
              min="0"
              max="100"
              onChange={handleTime}
              className="range z-10 w-full -translate-y-[4px]"
            />
            <div
              className={`absolute top-0 left-0 bg-white h-1 rounded-md group-hover:bg-green-500`}
              style={{
                width: `${
                  selectedSong && selectedSong.progress
                    ? selectedSong.progress + '%'
                    : 0
                }`,
              }}
            ></div>
          </div>
          <span>
            {selectedSong && selectedSong.length
              ? formatSecondsAsTime(selectedSong.length)
              : '-:--'}
          </span>
        </div>
      </div>
      <div className="flex gap-x-4 items-center custom-range relative">
        {!isMuted && sound > 0 ? (
          <HiSpeakerWave className="text-xl" onClick={handleMuted} />
        ) : (
          <HiSpeakerXMark className="text-xl" onClick={handleMuted} />
        )}
        <div
          className="group w-[100px] h-1 rounded-sm bg-[#ffffff50] relative cursor-pointer"
          ref={clickRefVolume}
          onClick={checkWidthVolume}
        >
          <div
            className={`absolute top-0 left-0 bg-white h-1 rounded-md group-hover:bg-green-500`}
            style={{
              width: `${sound}%`,
            }}
          ></div>
          <input
            value={sound}
            type="range"
            min="0"
            max="100"
            onChange={handleVolume}
            className="range z-10 w-full -translate-y-[4px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
