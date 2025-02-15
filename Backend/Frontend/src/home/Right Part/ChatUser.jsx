import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../assets/user.jpg"; 


const ChatUser = () => {
  const { selectConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button lg:hidden absolute left-5"
    >
      <CiMenuFries className="text-white text-xl" />
    </label>
    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
   
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={profile} />
        </div>
      </div>
      <div>
        <h1 className="text-md">{selectConversation.fullName}</h1>
        <span className="text-sm">
          {getOnlineUserStatus(selectConversation._id)}
        </span>
      </div>
    </div>
  </div>
  );
};

export default ChatUser;
