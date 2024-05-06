/* eslint-disable react-hooks/rules-of-hooks */
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

const Artist = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [requestData, setRequestData] = useState(Math.random());
  const [artistId, setArtistId] = useState(0);
  // (requestData);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8085/api/artist/findAll')
      .then((response) => {
        setLoading(false);
        response.data;
        setArtists(response.data.reverse());
      })
      .catch((error) => {
        setLoading(false);
        error;
      });
  }, [requestData]);
  const handleDeleteArtistById = (id) => {
    axios
      .delete(`http://localhost:8085/api/artist/delete/${id}`)
      .then((response) => {
        response;
        enqueueSnackbar('Artist was deleted successfully !', {
          variant: 'success',
        });
        setRequestData(Math.random());
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        error;
      });
  };

  const action = (snackbarId) => (
    <div className="flex gap-x-4">
      <button
        className="text-blue-500"
        onClick={() => {
          // handleDeleteArtistById(id);
          artistId;
        }}
      >
        Yes
      </button>
      <button
        className="text-red-500"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Cancel
      </button>
    </div>
  );

  const totalSongs = artists.length;
  const totalSongsPerPage = 10;
  const totalPages = Math.ceil(totalSongs / totalSongsPerPage);
  // (totalPages);

  //Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + totalSongsPerPage;
  const currentItems = artists.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(artists.length / totalSongsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * totalSongsPerPage) % artists.length;
    setItemOffset(newOffset);
  };
  return (
    <div className=" p-6">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">artist List</h1>
          <Link to="/artist/create">
            <VscDiffAdded className="text-3xl text-blue-500" />
          </Link>
        </div>
        <div className="w-full h-[500px] overflow-y-scroll">
          <table className="w-full bg-black rounded-lg">
            <thead>
              <tr>
                <th className="text-start pb-10 pt-5 pl-5 sticky top-0 bg-black">
                  #
                </th>
                <th className="text-start pb-10 pt-5 pl-5 sticky top-0 bg-black">
                  Photo
                </th>
                <th className="text-start pb-10 pt-5 pl-5 sticky top-0 bg-black">
                  Name
                </th>
                <th className="text-start pb-10 pt-5 pl-5 sticky top-0 bg-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((artist, index) => (
                <tr key={artist.id} className="py-2 hover:bg-[#ffffff30] ">
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md">
                    {artist.id}
                  </td>
                  <td className="py-2 px-5">
                    <img
                      src={artist.photo}
                      alt="photo"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-5 ">{artist.name}</td>

                  <td className="py-2 px-5 rounded-tr-md rounded-br-md">
                    <div className="flex items-center justify-start gap-x-4">
                      <Link to={`/artist/edit/${artist.id}`}>
                        <FiEdit className="text-xl text-yellow-500" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => {
                          confirm(
                            `Are you sure you want to delete Artist: ${artist.name} ?`
                          )
                            ? handleDeleteArtistById(artist.id)
                            : null;
                          // setArtistId(artist.id);
                          // (artistId);
                          // enqueueSnackbar(
                          //   `Are you sure you want to delete Artist: ${artist.name} ?`,
                          //   {
                          //     action,
                          //     preventDuplicate: true,
                          //   }
                          // );
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

export default Artist;
