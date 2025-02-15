import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error is logout : " + error);
    }
  };

  return (
    <div>
      <BiLogOutCircle
        onClick={handleClick}
        className=" text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-2"
      />
    </div>
  );
};

export default Logout;
