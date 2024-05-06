/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (!session) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className="flex gap-x-3 p-2 h-screen">
      <div className="w-1/5 bg-[#121212] rounded-md">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-[#121212] rounded-md overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
