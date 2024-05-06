/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const data = {
    email,
    password,
  };
  const handleLogin = () => {
    const userDto = {
      email,
      password,
    };
    const json = JSON.stringify(userDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('userDto', blob);
    for (var pair of formData.entries()) {
      `${pair[0]}: ${JSON.stringify(pair[1])}`;
    }
    data;
    axios
      .post('http://localhost:8085/api/user/login', userDto)
      .then((response) => {
        response;
        if (response.data.status) {
          enqueueSnackbar('Login successfully', { variant: 'success' });
          setUser(response.data.user);
          sessionStorage.setItem('account', JSON.stringify(response.data.user));
          navigate('/');
        } else {
          enqueueSnackbar('Email or password is incorrect !', {
            variant: 'error',
          });
        }
      })
      .catch((error) => {
        // alert('An error happened. Please check console');
        enqueueSnackbar('An error happened. Please check console !', {
          variant: 'error',
        });
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
            Login to Spotify
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
            <button
              className="text-black rounded-full bg-green-500 font-semibold w-full mt-10 text-lg py-3"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
