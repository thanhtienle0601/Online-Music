import { Link } from 'react-router-dom';
import './signUp.css';

const SignUp = () => {
  return (
    <div className="fixed bottom-1 left-1 signup_bar flex items-center justify-between p-4 cursor-pointer z-50 ">
      <div>
        <p className="uppercase">Preview of Spotify</p>
        <p className="font-semibold">
          Sign up to get unlimited songs and podcasts with occasional ads. No
          credit card needed.
        </p>
      </div>
      <Link
        to={'/signup'}
        className="rounded-full bg-white text-black px-6 py-3 font-bold "
      >
        Sign up free
      </Link>
    </div>
  );
};

export default SignUp;
