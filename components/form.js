import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const [username, setUsername] = useState('DJ@4');
  const [password, setPassword] = useState('Dhunjam@2023');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the login API
    const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === 200) {
      // Store the token and id in local storage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.id);

      // Redirect to the dashboard page
      router.push('/dashboard');
    } else {
      // Show an error message
      toast.error('Incorrect Username and/or Password!', {
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

  return (
    <div className="w-[600px] flex flex-col items-center justify-start gap-[50px] max-w-[600px] text-center text-13xl text-white font-regular-font lg:w-full">
      <b className="self-stretch relative">Venue Admin Login</b>
      <form onSubmit={handleSubmit} className="self-stretch flex flex-col items-center justify-start gap-[25px]">
        <input
          className="font-regular-font text-base text-white bg-[transparent] self-stretch rounded-lg box-border h-[58px] flex flex-row items-center justify-center py-0 px-[15px] border-[1px] border-solid border-white"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="font-regular-font text-base text-white bg-[transparent] self-stretch rounded-lg box-border h-[58px] flex flex-row items-center justify-center py-0 px-[15px] border-[1px] border-solid border-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="self-stretch flex flex-col items-center justify-start gap-[19px]">
          <button className="cursor-pointer py-0 px-[15px] bg-blueviolet self-stretch rounded-lg box-border h-[58px] flex flex-row items-center justify-center border-[1px] border-solid hover:border-thistle">
            <b className="self-stretch flex-1 relative text-base flex font-regular-font text-white text-center items-center justify-center">
              Sign In
            </b>
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base font-regular-font text-white text-center inline-block">
            New Registration?
          </button>
        </div>
      </form>
      <ToastContainer limit={3} style={{ width: "400px" }} />
    </div>
  );
};

export default Form;
