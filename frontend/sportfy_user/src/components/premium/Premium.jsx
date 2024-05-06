/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToolTip from '../tooltip/ToolTip';
import { BiSolidUserCircle } from 'react-icons/bi';
import { PayPalButton } from 'react-paypal-button-v2';

const Premium = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [packs, setPacks] = useState({});
  const [packId, setPackId] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [orderId, setOrderId] = useState('');
  let session = JSON.parse(sessionStorage.getItem('account'));
  useEffect(() => {
    axios
      .request('http://localhost:8085/api/pack/findAll')
      .then((response) => {
        response.data;
        setPacks(response.data);
      })
      .catch((err) => {
        err;
      });
  }, []);
  const addPayPalScript = async () => {
    const { data } = await axios.request(
      'http://localhost:8085/api/invoice/getPaypalInfo'
    );
    data.clientid;
    const id = data.clientid;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${id}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  packs;
  session;
  packId;
  var currentDate = new Date();
  var startDate =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear();
  startDate;
  // const onSuccessPayPal = (details, data) => {
  //   enqueueSnackbar('Payment successfully', { variant: 'success' });
  //   setIsPaid(true);
  //   (details.status, data.orderID);
  // };
  const addInvoice = (pack_id) => {
    const invoiceDto = {
      startDate,
      pack_id,
      user_id: session.id,
    };
    invoiceDto;
    const json = JSON.stringify(invoiceDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('invoiceDto', blob);
    formData.append('orderId', orderId);
    for (var pair of formData.entries()) {
      `${pair[0]}: ${JSON.stringify(pair[1])}`;
    }
    axios
      .post('http://localhost:8085/api/invoice/create', invoiceDto)
      .then((response) => {
        response;

        // navigate('/song');
      })
      .catch((error) => {
        // alert('An error happened. Please check console');

        error;
      });
  };

  const handleUpdatePremium = () => {
    const userDto = {
      id: session.id,
      fullname: session.fullname,
      email: session.email,
      phone: session.phone,
      username: session.username,
      password: session.password,
      status: session.status,
      ispremium: true,
      code: session.code,
    };
    userDto;
    const json = JSON.stringify(userDto);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('userDto', blob);
    formData.append('photo', new File([''], session.avt));

    for (var pair of formData.entries()) {
      `${pair[0]}: ${JSON.stringify(pair[1])}`;
    }
    axios
      .put('http://localhost:8085/api/user/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        response;

        // navigate('/song');
      })
      .catch((error) => {
        // alert('An error happened. Please check console');

        error;
      });
  };
  const handleLogin = () => {
    const userDto = {
      email: session.email,
      password: session.password,
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

    axios
      .post('http://localhost:8085/api/user/login', userDto)
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem('account');
        sessionStorage.setItem('account', JSON.stringify(response.data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col h-screen overflow-x-hidden bg-white">
      <header className="px-12 py-8 bg-black flex items-center justify-between">
        <Link to={'/'} className="logo">
          <img src="/assets/Spotify_Logo_RGB_White.png" alt="" width={120} />
        </Link>
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-semibold">
            {session.username || session.email}
          </span>
          {session.avt === null ? (
            <BiSolidUserCircle className="text-4xl cursor-pointer" />
          ) : (
            <img src={session.avt} className="w-10 h-10 rounded-full" />
          )}
        </div>
      </header>
      <div className=" w-full h-screen flex flex-col items-center">
        <div className="login-form flex flex-col items-center justify-center rounded-lg pb-20">
          <h1 className="text-center text-4xl font-bold my-20 text-black">
            Pick your Premium
          </h1>
          <div className="grid grid-cols-4 gap-x-5">
            {packs &&
              packs.length > 0 &&
              packs.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white border border-[#00000010] h-[300px] w-[300px] shadow-lg rounded-lg text-black px-3 py-5 flex flex-col items-start justify-between"
                >
                  <div className="flex flex-col gap-y-1">
                    <span className="border-blue-500 border text-sm font-semibold rounded-md px-2 py-1 text-blue-600">
                      One-time payment
                    </span>
                    <span className="font-semibold text-2xl">{pack.name}</span>
                    <span>From {pack.price}/month</span>
                  </div>
                  <div className="w-full" onClick={() => setPackId(pack.id)}>
                    {sdkReady ? (
                      <PayPalButton
                        amount={pack.price}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                          enqueueSnackbar('Payment successfully', {
                            variant: 'success',
                          });
                          setIsPaid(true);
                          setPackId(pack.id);
                          setOrderId(data.orderID);
                          addInvoice(pack.id);
                          handleUpdatePremium();
                          sessionStorage.removeItem('account');
                          navigate('/login');
                          details.status, data.orderID;
                        }}
                        onError={() => {
                          enqueueSnackbar('Something wrong !', {
                            variant: 'error',
                          });
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  {/* <button
                    className="bg-black p-3 rounded-full text-white w-full font-semibold"
                    onClick={() => {
                      navigate('/premium_details');
                    }}
                  >
                    Get started
                  </button> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
