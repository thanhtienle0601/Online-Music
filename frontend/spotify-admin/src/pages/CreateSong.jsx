/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import UseClickOutSide from '../components/hooks/UseClickOutSide';

const CreateSong = () => {
  const { show, setShow, nodeRef } = UseClickOutSide();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState({ id: '', name: '' });
  const [album, setAlbum] = useState({ id: '', name: '' });
  const [genre, setGenre] = useState();
  // (artist);
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState(null);
  const [premium, setPremium] = useState('false');
  const [errorPhoto, setErrorPhoto] = useState('');
  const [errorUrl, setErrorUrl] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSelectAlbum = (e) => {
    e.target.getAttribute('data-id'), e.target.innerText;
    const albumId = e.target.getAttribute('data-id');
    const albumName = e.target.innerText;
    setAlbum({ id: albumId, name: albumName });
    setShow(false);
  };
  useEffect(() => {
    axios
      .get('http://localhost:8085/api/album/findAll')
      .then((response) => {
        response.data;
        setAlbums(response.data.reverse());
      })
      .catch((error) => {
        error;
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8085/api/genre/findAll')
      .then((response) => {
        response.data;
        setGenres(response.data.reverse());
      })
      .catch((error) => {
        error;
      });
  }, []);
  const handleSaveSong = () => {
    const songDto = {
      title,
      ispremium: premium,
      album_id: album.id,
      genre_id: genre,
    };
    const json = JSON.stringify(songDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('songDto', blob);
    // formData.append('photo', photo);
    formData.append('songFile', url);
    for (var pair of formData.entries()) {
      `${pair[0]}: ${pair[1]}`;
    }
    axios
      .post('http://localhost:8085/api/song/create', formData)
      .then((response) => {
        response;
        enqueueSnackbar('Song created successfully', { variant: 'success' });
        navigate('/song');
      })
      .catch((error) => {
        // alert('An error happened. Please check console');
        enqueueSnackbar('An error happened', { variant: 'error' });
        error;
      });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="bg-black px-4 py-6 rounded-lg mt-10 w-[700px] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center my-10">Add Song</h1>
        <div className="flex flex-col items-center justify-center gap-y-5 w-4/5">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Title :
            </label>
            <input
              onChange={(e) => {
                if (e.target.value !== '') {
                  setTitle(e.target.value);
                  setErrorTitle('');
                } else {
                  setErrorTitle('Please filled this field');
                }
              }}
              name="title"
              id="title"
              type="text"
              className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Album :
            </label>
            <div className="relative w-full" ref={nodeRef}>
              <div
                className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
                onClick={() => setShow(!show)}
              >
                {album.name ? album.name : 'Please select'}
              </div>
              {show && (
                <div className="border border-gray-500 rounded-lg absolute top-full left-0 w-full overflow-hidden mt-3 h-[300px] bg-black overflow-y-scroll">
                  {albums &&
                    albums.length > 0 &&
                    albums.map((album) => (
                      <div
                        key={album.id}
                        className="p-5 cursor-pointer hover:bg-[#ffffff50] transition flex gap-x-4 items-center"
                        onClick={handleSelectAlbum}
                        data-id={album.id}
                      >
                        <img
                          src={album.photo}
                          alt=""
                          className="w-20 h-16 rounded-md object-top"
                        />
                        {album.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <label className="text-sm font-semibold" htmlFor="">
                Genre :
              </label>
              <select
                name="genre"
                id="genre"
                className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full photo-menu"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option defaultValue value={0}>
                  Please Select
                </option>
                {genres &&
                  genres.length > 0 &&
                  genres.map((genre) => (
                    <option value={genre.id} key={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* <div className="flex flex-col gap-y-2 w-full">
            <label
              className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer"
              htmlFor="photo"
            >
              select Image :
            </label>
            {photo && (
              <img
                alt="not found"
                src={URL.createObjectURL(photo)}
                className="w-1/2"
              />
            )}
            <input
              type="file"
              name="photo"
              id="photo"
              className="invisible hidden"
              onChange={(e) => {
                (e.target.files[0].type);
                if (
                  e.target.files[0].type === 'image/png' ||
                  e.target.files[0].type === 'image/jpeg'
                ) {
                  setPhoto(e.target.files[0]);
                  setErrorPhoto('');
                } else {
                  setErrorPhoto('Photo type must be png or jpeg');
                }
              }}
            />
            {errorPhoto && (
              <span className="text-red-500 text-sm ">{errorPhoto}</span>
            )}
          </div> */}
          <div className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="url"
              className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer"
            >
              Select File :
            </label>
            {url && (
              <div>
                <audio
                  src={URL.createObjectURL(url)}
                  controls
                  className="h-8"
                />
                <span>{url.name}</span>
              </div>
            )}
            <input
              onChange={(e) => {
                console.log(e.target.files[0]);
                if (e.target.files[0].type === 'audio/mpeg') {
                  setUrl(e.target.files[0]);
                  setErrorUrl('');
                } else {
                  setErrorUrl('url type must be audio/mpeg');
                }
              }}
              type="file"
              name="url"
              id="url"
              className="invisible hidden "
            />
            {errorUrl && (
              <span className="text-red-500 text-sm ">{errorUrl}</span>
            )}
          </div>
          <div className="flex gap-x-2 w-full">
            <span>Premium: </span>
            <input
              className="hidden"
              onChange={(e) => {
                e.target.checked;
                setPremium(e.target.checked);
              }}
              type="checkbox"
              name="premium"
              id="premium"
            />
            <label
              htmlFor="premium"
              className="w-5 h-5 rounded-sm bg-green-500 cursor-pointer check_premium shadow-[inset_0_0_2px_2px_rgba(0,0,0,0.6)]"
            >
              <AiOutlineCheck className="text-black font-bold checkmark invisible opacity-0 transition" />
            </label>
          </div>
          <button
            className="bg-green-500 text-xl font-semibold px-8 py-2 rounded-full text-black"
            onClick={() => {
              if (title === '') {
                enqueueSnackbar('Please filled the title', {
                  variant: 'error',
                });
                // } else if (photo === null || url === null) {
                //   enqueueSnackbar('Please choose the files', {
                //     variant: 'error',
                //   });
              } else {
                ('ok');
                handleSaveSong();
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSong;
