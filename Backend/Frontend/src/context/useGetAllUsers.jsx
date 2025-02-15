import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useCookies } from "react-cookie";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const localData = JSON.parse(localStorage.getItem("ChatApp"));
      
      try {
        const response = await axios.get(
          "https://chatapp-pd49.onrender.com/user/allUsers",
          {
            headers: {
              Authorization: `${localData.token}`, // Adjust token type if needed
            },
          }
        );
        setAllUsers(response.data.filteredUser);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;
