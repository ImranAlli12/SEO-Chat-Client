import React, { useEffect, useState } from "react";
import AllChats from "../components/Home/AllChats";
import ChatBox from "../components/Home/ChatBox";
import { io } from "socket.io-client";
import * as types from "../redux/appReducer/actionType";
import { useDispatch } from "react-redux";
// http://localhost:3000/
// const ENDPOINT="https://chatc.onrender.com"
// const ENDPOINT="http://localhost:8001/"
const ENDPOINT="https://seo-chat-server.vercel.app"

const Home = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socket = io(ENDPOINT);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("chat-app-login-user-data")
    );

    socket.on("connect", () => {
      setIsLoading(false);
    });

    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(true));

    dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: socket });

  }, []);

  return (
    <div className="flex flex-wrap justify-between h-screen max-h-full">
      <div className="w-full h-full lg:w-1/4 bg-white hidden lg:block">
        {/* Conditional rendering based on the socket connection status */}
        {isLoading ? (
          <p></p>
        ) : (
          <AllChats />
        )}
      </div>
      <div className="w-full h-full lg:w-3/4 bg-white p-4">
        {/* Conditional rendering based on the socket connection status */}
        {isLoading ? (
          <p></p>
        ) : (
          <ChatBox />
        )}
      </div>
    </div>
  );
};

export default Home;
