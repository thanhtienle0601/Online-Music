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

const Song = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [requestData, setRequestData] = useState(Math.random());
  requestData;
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8085/api/song/findAll2')
      .then((response) => {
        setLoading(false);
        response.data;
        setSongs(response.data.reverse());
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

  const totalSongs = songs.length;
  const totalSongsPerPage = 10;
  const totalPages = Math.ceil(totalSongs / totalSongsPerPage);
  totalPages;

  //Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + totalSongsPerPage;
  const currentItems = songs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(songs.length / totalSongsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * totalSongsPerPage) % songs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className=" p-6">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">Song List</h1>
          <Link to="/song/create">
            <VscDiffAdded className="text-3xl text-blue-500" />
          </Link>
        </div>
        <div className="w-full h-[500px] overflow-y-scroll">
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
                  Album
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Genre
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Source
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Premium
                </th>
                <th className="text-start sticky bg-black pb-10 pt-5 pl-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((song, index) => (
                <tr key={song.id} className="py-2 hover:bg-[#ffffff30] ">
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md">
                    {song.id}
                  </td>
                  <td className="py-2 px-5">
                    <img
                      src={song.album_photo}
                      alt="photo"
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-5 ">{song.title}</td>
                  <td className="py-2 px-5 ">{song.artist_name}</td>
                  <td className="py-2 px-5 ">{song.album_name}</td>
                  <td className="py-2 px-5 ">{song.genre_name}</td>
                  <td className="py-2 px-5">
                    {/* <audio controls name="media" className="h-8">
                      <source src={song.url} type="audio/mpeg"></source>
                    </audio> */}
                    <a href={song.url} target="_blank" rel="noreferrer">
                      URL
                    </a>
                  </td>
                  <td className="py-2 px-5 ">
                    {song.ispremium == 1 ? (
                      <div className="p-1 text-center border-green-500 border text-green-500 rounded-md">
                        Premium
                      </div>
                    ) : (
                      <div className="p-1 text-center border-slate-500 border text-slate-500 rounded-md text-sm">
                        Free
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-5 rounded-tr-md rounded-br-md">
                    <div className="flex items-center justify-start gap-x-4">
                      <Link to={`/song/edit/${song.id}`}>
                        <FiEdit className="text-xl text-yellow-500" />
                      </Link>
                      {/* <Link
                        onClick={() => {
                          confirm(
                            'Are you sure you want to delete this song ? '
                          )
                            ? deleteSongById(song.id)
                            : null;
                        }}
                      >
                        <RiDeleteBin5Line className="text-xl text-red-500" />
                      </Link> */}
                      <RiDeleteBin5Line
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => {
                          confirm(
                            `Are you sure you want to delete this song: ${song.title} ?`
                          )
                            ? handleDeleteSongById(song.id)
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

export default Song;
