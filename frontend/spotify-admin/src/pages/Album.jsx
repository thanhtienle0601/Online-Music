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

const Album = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [requestData, setRequestData] = useState(Math.random());
  requestData;
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8085/api/album/findAll')
      .then((response) => {
        setLoading(false);
        response.data;
        setAlbums(response.data.reverse());
      })
      .catch((error) => {
        setLoading(false);
        error;
      });
  }, [requestData]);
  const handleDeleteAlbumById = (id) => {
    axios
      .delete(`http://localhost:8085/api/album/delete/${id}`)
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

  const totalAlbums = albums.length;
  const totalAlbumsPerPage = 10;
  const totalPages = Math.ceil(totalAlbums / totalAlbumsPerPage);
  totalPages;

  //Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + totalAlbumsPerPage;
  const currentItems = albums.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(albums.length / totalAlbumsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * totalAlbumsPerPage) % albums.length;
    setItemOffset(newOffset);
  };

  return (
    <div className=" p-6">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">Album List</h1>
          <Link to="/album/create">
            <VscDiffAdded className="text-3xl text-blue-500" />
          </Link>
        </div>
        <div className="w-full h-[500px] overflow-hidden">
          <table className="w-full bg-black rounded-lg">
            <thead>
              <tr>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  ID
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Photo
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Title
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Artist
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Description
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((album, index) => (
                <tr key={album.id} className="py-2 hover:bg-[#ffffff30] ">
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md">
                    {album.id}
                  </td>
                  <td className="py-2 px-5">
                    <img
                      src={album.photo}
                      alt="photo"
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-5 ">{album.name}</td>
                  <td className="py-2 px-5 ">{album.artist_name}</td>
                  <td className="py-2 px-5 ">{album.description}</td>
                  <td className="py-2 px-5 rounded-tr-md rounded-br-md">
                    <div className="flex items-center justify-start gap-x-4">
                      <Link to={`/album/edit/${album.id}`}>
                        <FiEdit className="text-xl text-yellow-500" />
                      </Link>
                      {/* <Link
                        onClick={() => {
                          confirm(
                            'Are you sure you want to delete this album ? '
                          )
                            ? deletealbumById(album.id)
                            : null;
                        }}
                      >
                        <RiDeleteBin5Line className="text-xl text-red-500" />
                      </Link> */}
                      <RiDeleteBin5Line
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => {
                          confirm(
                            `Are you sure you want to delete this album: ${album.name} ?`
                          )
                            ? handleDeleteAlbumById(album.id)
                            : null;
                        }}
                      />
                    </div>
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

export default Album;
