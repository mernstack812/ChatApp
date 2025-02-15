import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";


const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setmessages, selectConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const localData = JSON.parse(localStorage.getItem("ChatApp"));
      
      if (selectConversation && selectConversation._id) {
        try {
          const res = await axios.get(
            `http://localhost:4000/message/get/${selectConversation._id}`,
            {
              headers: {
                Authorization: `${localData.token}`, // Adjust token type if needed
              },
            }
          );
          setmessages(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectConversation, setmessages]);
  return { loading, messages };
};

export default useGetMessage;
