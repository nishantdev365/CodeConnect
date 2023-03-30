import React from 'react';
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import settingIcon from "../assets/menu.png";
import User from "../components/User";
import EditorPage from "../components/EditorPage";
import { initSocket } from "../socket";
import logo from "../assets/logo.jpg"
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions.js";

const CodeEditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { userId } = useParams();
  const reactNavigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        // console.log("socket error", e);
        toast.error("socket connection failed, try again later.");
        reactNavigator("/");
      }

      // const socket = io(`ws://${window.location.hostname}:5000`);

      socketRef.current.emit(ACTIONS.JOIN, {
        userId,
        userName: location.state?.userName,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ users, userName, socketId }) => {
        // console.log("Received JOINED event with data: ", { users, userName, socketId });

        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined the room.`);
          console.log(`${userName} joined`);
        }

        setUsers(users);

        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });

        // console.log("Emitted SYNC_CODE event with data: ", { code: codeRef.current, socketId });

        // console.log("userId" , userId);
        // console.log("userName" , userName);
      });


      // Listening for disconnected

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room.`);
        setUsers((prev) => {
          return prev.filter((user) => user.socketId !== socketId);
        });
      });
    };

    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
    
  }, []);

  async function copyUserId() {
    try {
      await navigator.clipboard.writeText(userId);
      toast.success("Room Id has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copied Room Id");
      console.error(err);
    }
  }

  async function copyCode() {
    try {
      if (codeRef.current) {
        await navigator.clipboard.writeText(codeRef.current);
        toast.success("Code has been copied to your clipboard");
      } else {
        toast.error("Could not copy code: Code is empty");
      }
    } catch (err) {
      toast.error("Could not copy code");
      console.error(err);
    }
  }


  function leaveNow() {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                className="mr-4 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>

              <img
                src={logo}
                className="h-8 w-8 mr-3 rounded-full ring-2"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              CodeConnect
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={settingIcon}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={copyUserId}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-medium rounded-t-md text-gray-700 hover:bg-sky-400 hover:text-white"
                            )}
                          >
                            Share Room ID
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={copyCode}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-sky-400 hover:text-white"
                            )}
                          >
                            Copy your Code
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={leaveNow}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 font-medium rounded-b-md hover:bg-red-400 hover:text-white"
                            )}
                          >
                            Leave Now
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* -------------------------------------------------------------------------------------              */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-32 h-screen pt-20 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <h1 className="text-center text-white text-lg font-bold">
            Connected
          </h1>
          <ul className="space-y-2 mt-6 text-white">
            <li>

              {users.map((user) => (
                <User key={user.socketId} userName={user.userName} />
              ))}
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-32">
        <div className="mt-14 text-base sm:text-xl">
          <EditorPage socketRef={socketRef} userId={userId} onCodeChange={(code) => { codeRef.current = code }} />
        </div>
      </div>
    </>
  );
};

export default CodeEditorPage;
