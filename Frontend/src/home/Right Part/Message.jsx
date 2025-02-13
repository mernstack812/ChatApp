import React from "react";

const Message = ({ mkey, message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsME = message.senderId === authUser.user._id;

  const chatName = itsME ? "chat-end" : "chat-start";
  const chatColor = itsME ? "bg-blue-500" : "";

  const createAt = new Date(message.createdAt);
  const formattedTime = createAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div key={mkey} className=" p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white  ${chatColor} `}>
          {message.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
};

export default Message;
