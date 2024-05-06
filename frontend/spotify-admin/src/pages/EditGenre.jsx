/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditGenre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState();
  // const [photo, setPhoto] = useState();
  const [errorPhoto, setErrorPhoto] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/genre/find/${id}`)
      .then((response) => {
        response.data;
        setName(response.data.name);
        // setPhoto(response.data.photo);
      })
      .catch((error) => {
        alert('An error happened. Please check console');
        error;
      });
  }, [id]);

  const handleEditGenre = () => {
    const data = {
      id,
      name,
    };

    axios
      .put('http://localhost:8085/api/genre/update', data)
      .then((response) => {
        response;
        enqueueSnackbar('Genre Updated successfully', { variant: 'success' });
        navigate('/genre');
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
        <h1 className="text-3xl font-bold text-center my-10">Add Genre</h1>
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
                className="w-1/4 rounded-lg mt-2"
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

          <button
            className="bg-green-500 text-xl font-semibold px-8 py-2 rounded-full text-black"
            onClick={handleEditGenre}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGenre;
