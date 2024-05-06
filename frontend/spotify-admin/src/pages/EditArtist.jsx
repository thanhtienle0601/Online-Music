/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditArtist = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState();
  const [photo, setPhoto] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [errorPhoto, setErrorPhoto] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/artist/find/${id}`)
      .then((response) => {
        response.data;
        setName(response.data.name);
        setPhoto(response.data.photo);
      })
      .catch((error) => {
        alert('An error happened. Please check console');
        error;
      });
  }, [id]);

  const handleEditArtist = () => {
    const artistDto = {
      id: id,
      name: name,
    };
    const json = JSON.stringify(artistDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('artistDto', blob);
    formData.append(
      'photo',
      newPhoto != null ? newPhoto : new File([''], photo)
    );
    for (var pair of formData.entries()) {
      `${pair[0]}: ${pair[1]}`;
    }
    axios
      .put('http://localhost:8085/api/artist/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        response;
        enqueueSnackbar('Song Updated successfully', { variant: 'success' });
        navigate('/artist');
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
        <h1 className="text-3xl font-bold text-center my-10">Add Artist</h1>
        <div className="flex flex-col items-center justify-center gap-y-5 w-4/5">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm font-semibold" htmlFor="">
              Name :
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              type="text"
              className="bg-[#121212] py-2 rounded-md px-4 border border-[#ffffff80] w-full"
              placeholder="name"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label
              className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer mb-3"
              htmlFor="photo"
            >
              select Image :
            </label>
            {newPhoto ? (
              <img
                alt="not found"
                src={URL.createObjectURL(newPhoto)}
                className="w-1/4 rounded-lg"
              />
            ) : (
              <img src={photo} className="w-1/4 rounded-lg" />
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

          <button
            className="bg-green-500 text-xl font-semibold px-8 py-2 rounded-full text-black"
            onClick={handleEditArtist}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArtist;
