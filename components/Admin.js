import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Admin = () => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(true);
  const [amount, setAmount] = useState('');
  const [category_6, setCategory_6] = useState('');
  const [category_7, setCategory_7] = useState('');
  const [category_8, setCategory_8] = useState('');
  const [category_9, setCategory_9] = useState('');
  const [category_10, setCategory_10] = useState('');

  useEffect(() => {
    setId(localStorage.getItem('id'));
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (!id || !token) {
      return;
    }

    fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data.data);
      });
  }, [id, token]);

  const handleSave = async () => {
    const response = await fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: {
          category_6: category_6,
          category_7: category_7,
          category_8: category_8,
          category_9: category_9,
          category_10: category_10,
        },
      }),
    });

    const data = await response.json();
    if (data.status === 200) {
      toast.success('Update Successful!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setData(data.data);
        });
    } else {
      toast.error('Update failed!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-[20px] max-w-[600px] text-center text-13xl text-white font-regular-font lg:w-full">
      <b className="self-stretch relative">{data.name}, {data.location} on Dhun Jam</b>
      <div className="self-stretch flex flex-col items-center justify-center gap-[20px] text-left text-base">
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="flex-1 relative inline-block max-w-[300px]">
            Do you want to charge your customers for requesting songs?
          </div>
          <div className="flex-1 flex justify-evenly relative rounded-lg max-w-[300px]">
            <label>
              <input className='text-base' type="radio" value="Yes" checked={chargeCustomers === true} onChange={() => setChargeCustomers(true)} />
              Yes
            </label>
            <label>
              <input className='text-base' type="radio" value="No" checked={chargeCustomers === false} onChange={() => setChargeCustomers(false)} />
              No
            </label>

          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="flex-1 relative inline-block max-w-[300px]">
            Custom song request amount-
          </div>
          <input
            className="font-regular-font text-white text-base bg-[transparent] self-stretch flex-1 rounded-lg box-border flex flex-row items-center justify-center py-2.5 px-[15px] max-w-[300px] border-[1px] border-solid border-white text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:border-[#c2c2c2] disabled:text-[#c2c2c2]"
            placeholder={data.amount.category_6}
            value={amount.category_6}
            type="number"
            onChange={(e) => setCategory_6(e.target.value)}
            disabled={!chargeCustomers}
          />
        </div>
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="flex-1 relative inline-block max-w-[300px]">
            Regular song request amounts, form high to low-
          </div>
          <div className="flex-1 flex flex-row items-center gap-[10px] justify-start max-w-[300px]">
            <input
              className="font-regular-font text-white text-base bg-[transparent] max-w-[67.5px] flex-1 rounded-lg box-border flex flex-row items-center justify-center py-2.5 px-[5px] my-[5px] border-[1px] border-solid border-white text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:border-[#c2c2c2] disabled:text-[#c2c2c2]"
              placeholder={data.amount.category_7}
              value={amount.category_7}
              type="number"
              onChange={(e) => setCategory_7(e.target.value)}
              disabled={!chargeCustomers}
            />
            <input
              className="font-regular-font text-white text-base bg-[transparent] max-w-[67.5px] flex-1 rounded-lg box-border flex flex-row items-center justify-center py-2.5 px-[5px] my-[5px] border-[1px] border-solid border-white text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:border-[#c2c2c2] disabled:text-[#c2c2c2]"
              placeholder={data.amount.category_8}
              value={amount.category_8}
              type="number"
              onChange={(e) => setCategory_8(e.target.value)}
              disabled={!chargeCustomers || category_6 < category_7}
            />
            <input
              className="font-regular-font text-white text-base bg-[transparent] max-w-[67.5px] flex-1 rounded-lg box-border flex flex-row items-center justify-center py-2.5 px-[5px] my-[5px] border-[1px] border-solid border-white text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:border-[#c2c2c2] disabled:text-[#c2c2c2]"
              placeholder={data.amount.category_9}
              value={amount.category_9}
              type="number"
              onChange={(e) => setCategory_9(e.target.value)}
              disabled={!chargeCustomers || category_6 < category_7 || category_7 < category_8}
            />
            <input
              className="font-regular-font text-white text-base bg-[transparent] max-w-[67.5px] flex-1 rounded-lg box-border flex flex-row items-center justify-center py-2.5 px-[5px] my-[5px] border-[1px] border-solid border-white text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:border-[#c2c2c2] disabled:text-[#c2c2c2]"
              placeholder={data.amount.category_10}
              value={amount.category_10}
              type="number"
              onChange={(e) => setCategory_10(e.target.value)}
              disabled={!chargeCustomers || category_6 < category_7 || category_7 < category_8 || category_8 < category_9}
            />
          </div>
        </div>
      </div>
      {chargeCustomers ? (
        <div className="self-stretch box-border min-h-[400px] flex flex-row items-end justify-between py-0 px-[75px] border-b-[1px] border-solid border-white border-l-[1px]">
          <div className="relative bg-thistle w-[50px]" style={{ height: `${data.amount.category_6}px` }} />
          <div className="relative bg-thistle w-[50px]" style={{ height: `${data.amount.category_7}px` }} />
          <div className="relative bg-thistle w-[50px]" style={{ height: `${data.amount.category_8}px` }} />
          <div className="relative bg-thistle w-[50px]" style={{ height: `${data.amount.category_9}px` }} />
          <div className="relative bg-thistle w-[50px]" style={{ height: `${data.amount.category_10}px` }} />
        </div>
      ) : (null)}
      <button className="cursor-pointer py-0 px-[15px] bg-blueviolet self-stretch rounded-lg box-border h-[58px] flex flex-row items-center justify-center border-[1px] border-solid hover:border-thistle disabled:bg-[#c2c2c2]"
        onClick={handleSave}
        disabled={!chargeCustomers || category_6 <= 99 || category_7 <= 79 || category_8 <= 59 || category_9 <= 39 || category_10 <= 19}>
        <b className="self-stretch flex-1 relative text-base flex font-regular-font text-white text-center items-center justify-center">
          Save
        </b>
      </button>
      <ToastContainer limit={3} />
    </div>
  );
};

export default Admin;
