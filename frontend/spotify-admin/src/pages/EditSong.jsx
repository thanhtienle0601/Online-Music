/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import UseClickOutSide from '../components/hooks/UseClickOutSide';

const EditSong = () => {
  const { show, setShow, nodeRef } = UseClickOutSide();
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [album, setAlbum] = useState({ id: '', name: '' });
  const [genre, setGenre] = useState({ id: '', name: '' });
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState(null);
  const [premium, setPremium] = useState(false);
  const [errorPhoto, setErrorPhoto] = useState('');
  const [errorUrl, setErrorUrl] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [song, setSong] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [newPhoto, setNewPhoto] = useState(null);
  const [newUrl, setNewUrl] = useState(null);
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

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/song/find/${id}`)
      .then((response) => {
        response.data;
        setTitle(response.data.title);
        setPhoto(response.data.photo);
        setUrl(response.data.url);
        setPremium(response.data.ispremium);
        setAlbum({
          id: response.data.album_id,
          name: response.data.album_name,
        });
        setGenre({
          id: response.data.genre_id,
          name: response.data.genre_name,
        });
        setSong(response.data);
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        error;
      });
  }, [enqueueSnackbar, id]);

  const handleEditSong = () => {
    const songDto = {
      id,
      title,
      ispremium: premium,
      album_id: album.id,
      genre_id: genre.id,
    };
    const json = JSON.stringify(songDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('songDto', blob);
    formData.append(
      'photo',
      newPhoto != null ? newPhoto : new File([''], photo)
    );
    formData.append('songFile', newUrl != null ? newUrl : new File([''], url));
    for (var pair of formData.entries()) {
      `${pair[0]}: ${pair[1]}`;
    }
    axios
      .put('http://localhost:8085/api/song/update', formData)
      .then((response) => {
        response;
        enqueueSnackbar('Song Updated successfully', { variant: 'success' });
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
        <h1 className="text-3xl font-bold text-center my-10">Edit Song</h1>
        <div className="flex flex-col items-center justify-center gap-y-5 w-4/5">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                value={genre.id}
                name="genre"
                id="genre"
                className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full photo-menu"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option disabled value="">
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
          <div className="flex flex-col gap-y-2 w-full">
            <label
              className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer"
              htmlFor="photo"
            >
              select Image :
            </label>
            {newPhoto ? (
              <img
                alt="not found"
                src={URL.createObjectURL(newPhoto)}
                className="w-1/2"
              />
            ) : (
              <img src={photo} />
            )}
            <input
              hidden
              type="file"
              name="photo"
              id="photo"
              onChange={(e) => {
                e.target.files[0].type;
                if (
                  e.target.files[0].type === 'image/png' ||
                  e.target.files[0].type === 'image/jpeg'
                ) {
                  setNewPhoto(e.target.files[0]);
                  setErrorPhoto('');
                } else {
                  setErrorPhoto('Photo type must be png or jpeg');
                  enqueueSnackbar('Photo type must be png or jpeg', {
                    variant: 'error',
                  });
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="url"
              className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer"
            >
              Select url :
            </label>
            {newUrl ? (
              <div>
                <audio
                  src={URL.createObjectURL(newUrl)}
                  controls
                  className="h-8"
                />
                <span>{newUrl.name}</span>
              </div>
            ) : (
              <audio src={url} controls className="h-8" />
            )}

            <input
              // value={url}
              onChange={(e) => {
                e.target.files[0].type;
                if (e.target.files[0].type === 'audio/mpeg') {
                  setNewUrl(e.target.files[0]);
                  setErrorUrl('');
                } else {
                  setErrorUrl('url type must be audio/mpeg');
                  enqueueSnackbar('url type must be audio/mpeg', {
                    variant: 'error',
                  });
                }
              }}
              type="file"
              name="url"
              id="url"
              hidden
            />
          </div>
          <div className="flex gap-x-2 w-full">
            <span>Premium: </span>
            <input
              checked={premium}
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
              } else if (photo === null || url === null) {
                enqueueSnackbar('Please choose the files', {
                  variant: 'error',
                });
              } else {
                ('ok');
                handleEditSong();
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSong;
