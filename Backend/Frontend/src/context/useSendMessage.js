import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setmessages, selectConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    const localData = JSON.parse(localStorage.getItem("ChatApp"));


    const data = {
      message: message,
    };

    try {
      const res = await axios.post(
        `https://chatapp-pd49.onrender.com/message/send/${selectConversation._id}`,
        data,
        {
          headers: {
            Authorization: `${localData.token}`, // Adjust token type if needed
          },
        }
      );
      console.log(res.data);
      
      setmessages([...messages,res.data.newMessage]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages :" + error);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
