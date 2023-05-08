import React, { useState } from "react";
import { UPDATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import Delete from "./Delete";
import Logout from "./Logout";


export default function UserInfo(props) {
  const [userData, setUserData] = useState({ age: "" });
  const [updateUser] = useMutation(UPDATE_USER);

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      await updateUser({ variables: { ...userData } });

      window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };


  let userAge = Auth.getProfile().data.age;


  return (
    <div className="user-container">
      <form onSubmit={handleUserUpdate}>
        <h2 className="user-welcome">
          {" "}
          Welcome<br></br>
          {Auth.getProfile().data.username}!{" "}
        </h2>
        {userAge ? (
          <div>
            {" "}

            <h3 className="user-stats">
              {/* this pulls the data from the database */}
              Your age: <p className="stat-fig">{userAge}</p>
            </h3>


          </div>
        ) : (
          <h3 className="ice-breaker">
            We should get to know each other better:
          </h3>
        )}

        {/* <Delete /> */}
        <br></br>
        <Logout />
      </form>
    </div>
  );
}
