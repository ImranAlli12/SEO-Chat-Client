import React from 'react';
import logo from "../../../assets/file.jpeg"
export default function Message({ item }) {
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  const chatAlign = parsedData._id === item.sender._id ? 'items-end' : 'items-start';

  const createdAt = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
console.log(item)
  return (
    <div className={`flex flex-col ${chatAlign} m-3`}>
      {/* User */}
      <div className={`flex  gap-2 mb-1 ${parsedData._id !== item.sender._id ? 'flex-row-reverse' : ''}`}>
        {/* Text */}
        <div className={`${parsedData._id !== item.sender._id ? "text-left " : "text-right"}`}>
          <div
            className={`p-2 bg-green-500 text-primary-50 text-sm max-w-lg break-words ${parsedData._id !== item.sender._id ? 'rounded-r-lg rounded-tl-lg' : 'rounded-l-lg rounded-tr-lg'}`}
            data-kt-element="message-text"
          >
            {item.message}
          </div>
          {/* Time */}
          <span className="text-primary-900 text-xs px-1 ">{createdAt}</span>
        </div>
        {/* Avatar */}
        <div className={`bg-yellow-300 rounded-full w-9 h-9 flex items-center justify-center`}>
          {/* <img
            alt="Pic"
            src={item.sender.pic}
            className="w-8 h-8 rounded-full"
          /> */}
          <img
            alt="Pic"
            src={logo}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
