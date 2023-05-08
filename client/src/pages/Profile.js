// src/pages/Profile.js

import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
// import { useState } from "react";
import Auth from "../utils/auth";
// import BookSearch from "../components/BookSearch";

export default function Profile() {
  // const [query, setQuery] = useState("");

  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <div>
            <Link to="/social-feed" className="social-feed-button">
              Social Feed
            </Link>
            <UserInfo />
          </div>
          <div>
            {/* <BookSearch onQuery={setQuery} /> */}
            <br></br>
          </div>
        </div>
      ) : (
        <p>
          You need to be logged in. Please <Link to="/">login</Link>
        </p>
      )}
    </>
  );
}
