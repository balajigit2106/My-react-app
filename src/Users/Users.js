import React, { useEffect } from "react";
import { getTeams, getUsers } from "../API-Service/action";

export default function Users() {
  useEffect(() => {
    getUsersData();
  });

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      console.log("user response", response);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        getTeamsData(1);
      }, 300);
    }
  };

  const getTeamsData = async (id) => {
    const payload = {
      ...(id && { id: id }),
    };
    try {
      const response = await getTeams(payload);
      console.log("team response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Users</p>
    </div>
  );
}
