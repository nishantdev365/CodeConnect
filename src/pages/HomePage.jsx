import React, { useState } from 'react'
import { v4 as uuidV4} from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpg"
import heroImg from "../assets/codepic.jpg"

const HomePage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const generateNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setUserId(id)
    toast.success("Room Generated")
  
  };

  const joinRoom = () => {
    if(!userId || !userName){
      toast.error("Please enter Your ROOM Id & USERNAME first");
      
      return;
     
    }

      // Redirect
      navigate(`/CodeEditor/${userId}`, {
        state: {
          userName,
        },
      });
    }
  

    const handleInput = (e) => {
     if(e.code === 'Enter'){
      joinRoom()
     }
    };


  return (

    <section className='bg-black h-screen'>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img
            className="object-cover object-top w-full h-full"
            src={heroImg}
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative">
          <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
            <h3 className="text-4xl font-bold text-white">
            Share your code in real-time, hassle-free!
            </h3>
            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      // clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-white">
                  {" "}
                  No sign-in required{" "}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      // clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-white">
                  {" "}
                  Real-time sharing{" "}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      // clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-white">
                  {" "}
                  Easy interface{" "}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      // fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      // clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-lg font-medium text-white">
                  {" "}
                  Efficient{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black flex items-center justify-center lg:pt-36 px-4 pb-12 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="w-full max-w-md space-y-8 bg-slate-300 p-6 rounded-lg">
        <div>
        <div className='flex justify-center items-center'>
        <img
            className="mr-3 h-10 w-10 rounded-full ring-2" 
            src={logo}
            alt="Your Company"
          />
          <h1 className='font-bold text-lg text-gray-600'>CodeConnect</h1>
        </div>
          <h5 className="mt-6 text-center font-bold tracking-tight text-gray-600">
            Fill your invitation ROOM ID
          </h5>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                ROOM ID
              </label>
              <input
                type="room-id"
                required
                className="relative block w-full rounded-md border-0 mb-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-2 focus:z-10 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="ROOM ID"
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
                onKeyUp={handleInput}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                USERNAME
              </label>
              <input
                type="username"
                autoComplete="current-username"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-2 focus:z-10 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="USERNAME"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                onKeyUp={handleInput}
              />
            </div>
          </div>

          <div>
            <button
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300"
              onClick={joinRoom}
            >
              Join
            </button>
          </div>

          <div className="flex items-center justify-between">

            <div className="text-md text-center">
              <h6>If an invitation is unavailable, please proceed to create a &nbsp;<a onClick={generateNewRoom} href="#" className="font-medium underline text-indigo-600 hover:text-indigo-500">
                new room
              </a></h6>
              
            </div>
          </div>

        </form>
      </div>
    </div>
    </div>
  </section>
  )
}

export default HomePage

