import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

const Users = () => {
  const [allUsers, loading] = useGetAllUsers();
 

  return (
    <div>
      <h1 className=" px-8 py-2 mt-2 mb-2 text-white font-semibold bg-slate-600 rounded-md">
        Messages
      </h1>

      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(81vh - 8vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
