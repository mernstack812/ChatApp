import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import profile from "../../../public/user.jpg";

const User = ({ user }) => {
  const { selectConversation, setselectConversation } = useConversation();
  const isSelected = selectConversation?._id == user._id;

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={` hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setselectConversation(user)}
    >
      <div className=" flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profile} />
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.fullName}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
