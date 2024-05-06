/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseClickOutSide from '../components/hooks/UseClickOutSide';

const CreateAlbum = () => {
  const { show, setShow, nodeRef } = UseClickOutSide();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [des, setDes] = useState();
  const [photo, setPhoto] = useState();
  const [errorPhoto, setErrorPhoto] = useState('');
  const [artist, setArtist] = useState({ id: '', name: '' });
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8085/api/artist/findAll')
      .then((response) => {
        response.data;
        setArtists(response.data.reverse());
      })
      .catch((error) => {
        error;
      });
  }, []);

  const handleSelectArtist = (e) => {
    e.target.getAttribute('data-id'), e.target.innerText;
    const artistId = e.target.getAttribute('data-id');
    const artistName = e.target.innerText;
    setArtist({ id: artistId, name: artistName });
    setShow(false);
  };

  const handleSaveAlbum = () => {
    const albumDto = {
      name,
      artist_id: artist.id,
      description: des,
    };
    const json = JSON.stringify(albumDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('albumDto', blob);
    formData.append('photo', photo);
    for (var pair of formData.entries()) {
      `${pair[0]}: ${pair[1]}`;
    }

    axios
      .post('http://localhost:8085/api/album/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        response;
        enqueueSnackbar('Album created successfully', { variant: 'success' });
        navigate('/album');
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
        <h1 className="text-3xl font-bold text-center my-10">Add Album</h1>
        <div className="flex flex-col items-center justify-center gap-y-5 w-4/5">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Name :
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              type="text"
              className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Description :
            </label>
            <input
              onChange={(e) => setDes(e.target.value)}
              name="description"
              id="description"
              type="text"
              className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              artist :
            </label>
            <div className="relative w-full" ref={nodeRef}>
              <div
                className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
                onClick={() => setShow(!show)}
              >
                {artist.name ? artist.name : 'Please select'}
              </div>
              {show && (
                <div className="border border-gray-500 rounded-lg absolute top-full left-0 w-full overflow-hidden mt-3 h-[300px] bg-black overflow-y-scroll">
                  {artists &&
                    artists.length > 0 &&
                    artists.map((artist) => (
                      <div
                        key={artist.id}
                        className="p-5 cursor-pointer hover:bg-[#ffffff50] transition flex gap-x-4 items-center"
                        onClick={handleSelectArtist}
                        data-id={artist.id}
                      >
                        <img
                          src={artist.photo}
                          alt=""
                          className="w-16 h-16 rounded-full object-top"
                        />
                        {artist.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
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
                className="w-1/4 rounded-lg mt-2"
              />
            )}
            <input
              type="file"
              name="photo"
              id="photo"
              className="invisible hidden"
              onChange={(e) => {
                e.target.files[0].type;
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
          </div>

          <button
            className="bg-green-500 text-xl font-semibold px-8 py-2 rounded-full text-black"
            onClick={handleSaveAlbum}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;
