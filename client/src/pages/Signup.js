import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import './Signup.css';

export default function Signup(props) {
  // Set up the initial state for the form
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  // Use the useMutation hook to execute the ADD_USER mutation
  const [addUser, error] = useMutation(ADD_USER);

  // Handle changes to the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute the ADD_USER mutation and extract the token from the response
      const mutationResponse = await addUser({
        variables: { ...formState },
      });
      const token = mutationResponse.data.addUser.token;
      // Log the token in with Auth.login
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container my-1">
        <form className="form-title" onSubmit={handleFormSubmit}>
          Signup
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username:</label>
            <input
              className="input-field"
              value={formState.username}
              placeholder="Enter Username"
              name="username"
              type="username"
              id="signupUsername"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              className="input-field"
              value={formState.email}
              placeholder="your.email@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="password">Password:</label>
            <input
              className="input-field"
              value={formState.password}
              placeholder="******"
              name="password"
              type="password"
              id="signupPwd"
              onChange={handleChange}
            />
          </div>

          {/* Conditionally render error message */}
          {error ? (
            <div>
              {/* <p className="error-text">The provided credentials are incorrect</p> */}
            </div>
          ) : null}

          <div id="btn-container" className="flex-row flex-end">
            <button id="signup-btn" type="submit">
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
