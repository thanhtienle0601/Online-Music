/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SingUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [avt, setAvt] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [errorPhoto, setErrorPhoto] = useState('');
  const navigate = useNavigate();

  const handleRegisterUser = () => {
    const userDto = {
      email,
      password,
      username,
      fullname,
      phone,
    };
    const json = JSON.stringify(userDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('userDto', blob);
    formData.append('avt', avt);
    for (var pair of formData.entries()) {
      `${pair[0]}: ${JSON.stringify(pair[1])}`;
    }
    axios
      .post('http://localhost:8085/api/user/register', formData)
      .then((response) => {
        response;
        enqueueSnackbar('Please check your email to active your account !', {
          variant: 'info',
        });
        navigate('/login');
      })
      .catch((error) => {
        // alert('An error happened. Please check console');
        enqueueSnackbar('An error happened', { variant: 'error' });
        error;
      });
  };
  return (
    <div className="flex flex-col h-screen overflow-x-hidden bg-black">
      <header className="px-12 py-8">
        <Link to={'/'} className="logo">
          <img src="/assets/Spotify_Logo_RGB_White.png" alt="" width={120} />
        </Link>
      </header>
      <div className="bg-linear w-full h-screen flex flex-col items-center">
        <div className="login-form bg-black w-[750px] flex flex-col items-center justify-center rounded-lg mt-16 pb-20">
          <h1 className="text-center text-4xl font-bold my-20">
            Sign up to start listening
          </h1>
          <div className="px-10 w-3/5">
            <div className="form-input flex flex-col gap-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="text"
                className="bg-[#151414] p-3 rounded-lg border border-s-white"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-input flex flex-col gap-y-2 mt-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="bg-[#151414] p-3 rounded-lg border border-s-white"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-input flex flex-col gap-y-2 mt-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                className="bg-[#151414] p-3 rounded-lg border border-s-white"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-input flex flex-col gap-y-2 mt-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Full name
              </label>
              <input
                name="fullname"
                id="fullname"
                type="text"
                className="bg-[#151414] p-3 rounded-lg border border-s-white"
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-input flex flex-col gap-y-2 mt-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Phone
              </label>
              <input
                name="phone"
                id="phone"
                type="text"
                className="bg-[#151414] p-3 rounded-lg border border-s-white"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-input flex flex-col gap-y-2 mt-4">
              <label
                className="text-sm font-semibold bg-green-500 w-fit px-2 py-1 text-black rounded-md cursor-pointer"
                htmlFor="avt"
              >
                select Image :
              </label>
              {avt && (
                <img
                  alt="not found"
                  src={URL.createObjectURL(avt)}
                  className="w-1/4 rounded-lg mt-2"
                />
              )}
              <input
                type="file"
                name="avt"
                id="avt"
                className="invisible hidden"
                onChange={(e) => {
                  e.target.files[0].type;
                  if (
                    e.target.files[0].type === 'image/png' ||
                    e.target.files[0].type === 'image/jpeg'
                  ) {
                    setAvt(e.target.files[0]);
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
              className="text-black rounded-full bg-green-500 font-semibold w-full mt-10 text-lg py-3"
              onClick={handleRegisterUser}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
