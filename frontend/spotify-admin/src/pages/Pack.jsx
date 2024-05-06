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

const Pack = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [packs, setPacks] = useState([]);
  const [requestData, setRequestData] = useState(Math.random());
  requestData;
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8085/api/pack/findAll')
      .then((response) => {
        setLoading(false);
        response.data;
        setPacks(response.data);
      })
      .catch((error) => {
        setLoading(false);
        error;
      });
  }, [requestData]);
  const totalSongs = packs.length;
  const totalSongsPerPage = 10;
  const totalPages = Math.ceil(totalSongs / totalSongsPerPage);
  totalPages;

  //Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + totalSongsPerPage;
  const currentItems = packs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(packs.length / totalSongsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * totalSongsPerPage) % packs.length;
    setItemOffset(newOffset);
  };

  const handleDeletePackById = (id) => {
    axios
      .delete(`http://localhost:8085/api/Pack/delete/${id}`)
      .then((response) => {
        response;
        enqueueSnackbar('Pack was deleted successfully !', {
          variant: 'success',
        });
        setRequestData(Math.random());
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        error;
      });
  };
  // const action = (snackbarId) => (
  //   <div className="flex gap-x-4">
  //     <button
  //       className="text-blue-500"
  //       onClick={() => {
  //         alert(`I belong to snackbar with id ${snackbarId}`);
  //       }}
  //     >
  //       Yes
  //     </button>
  //     <button
  //       className="text-red-500"
  //       onClick={() => {
  //         closeSnackbar(snackbarId);
  //       }}
  //     >
  //       Cancel
  //     </button>
  //   </div>
  // );
  return (
    <div className=" p-6">
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">artist List</h1>
          <Link to="/Pack/create">
            <VscDiffAdded className="text-3xl text-blue-500" />
          </Link>
        </div>
        <div className="w-full h-[500px] overflow-y-scroll">
          <table className="w-full bg-black rounded-lg">
            <thead>
              <tr>
                <th className="text-start pb-10 pt-5 pl-5 sticky top-0 bg-black">
                  Id
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
              {currentItems.map((pack, index) => (
                <tr key={pack.id} className="py-2 hover:bg-[#ffffff30] ">
                  <td className="py-2 px-5 rounded-tl-md rounded-bl-md">
                    {pack.id}
                  </td>

                  <td className="py-2 px-5 ">{pack.name}</td>

                  <td className="py-2 px-5 rounded-tr-md rounded-br-md">
                    <div className="flex items-center justify-start gap-x-4">
                      <Link to={`/pack/edit/${pack.id}`}>
                        <FiEdit className="text-xl text-yellow-500" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => {
                          confirm(
                            `Are you sure you want to delete this pack: ${pack.name} ?`
                          )
                            ? handleDeletePackById(pack.id)
                            : null;
                          // enqueueSnackbar(
                          //   `Are you sure you want to delete Pack: ${Pack.name} ?`,
                          //   {
                          //     action,
                          //     persist: true,
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

export default Pack;
