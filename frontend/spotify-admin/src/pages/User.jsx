/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useReducer, useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscDiffAdded } from 'react-icons/vsc';
import { Link, redirect, useNavigate, useRoutes } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const User = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [requestData, setRequestData] = useState(Math.random());
  requestData;
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8085/api/user/findAll')
      .then((response) => {
        setLoading(false);
        response.data;
        setUsers(response.data.reverse());
      })
      .catch((error) => {
        setLoading(false);
        error;
      });
  }, [requestData]);
  const handleDeleteSongById = (id) => {
    axios
      .delete(`http://localhost:8085/api/song/delete/${id}`)
      .then((response) => {
        response;
        enqueueSnackbar('Album was deleted successfully !', {
          variant: 'success',
        });
        setRequestData(Math.random());
      })
      .catch((error) => {
        error;
        enqueueSnackbar('An error happened', { variant: 'error' });
      });
  };

  const totalSongs = users.length;
  const totalSongsPerPage = 10;
  const totalPages = Math.ceil(totalSongs / totalSongsPerPage);
  totalPages;

  //Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + totalSongsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / totalSongsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * totalSongsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <div className=" p-6">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">Song List</h1>
          {/* <Link to="/song/create">
            <VscDiffAdded className="text-3xl text-blue-500" />
          </Link> */}
        </div>
        <div className="w-full h-[500px] overflow-y-scroll">
          <table className="w-full bg-black rounded-lg">
            <thead>
              <tr>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  ID
                </th>
                {/* <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Avatar
                </th> */}
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Full Name
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Username
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Email
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Status
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user.id} className="py-2 hover:bg-[#ffffff30] ">
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md">
                    {user.id}
                  </td>
                  {/* <td className="py-2 px-5">
                    <img
                      src={user.avt}
                      alt="photo"
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </td> */}
                  <td className="py-2 px-5 ">{user.fullname}</td>
                  <td className="py-2 px-5 ">{user.username}</td>
                  <td className="py-2 px-5 ">{user.email}</td>
                  <td className="py-2 px-5 ">
                    {user.status == 1 ? (
                      <div className="p-1 text-center border-green-500 border text-green-500 rounded-md">
                        Active
                      </div>
                    ) : (
                      <div className="p-1 text-center border-slate-500 border text-slate-500 rounded-md text-sm">
                        UnActive
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-5 ">
                    {user.ispremium == 1 ? (
                      <div className="p-1 text-center border-green-500 border text-green-500 rounded-md">
                        Premium
                      </div>
                    ) : (
                      <div className="p-1 text-center border-slate-500 border text-slate-500 rounded-md text-sm">
                        Free
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <Spinner />}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default User;
