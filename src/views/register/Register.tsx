import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../types/types";
import { useAppSelector } from "../../redux/hooks";
import "../login/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //need square brackets in object property to tell that this refers to dynamic key
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleError = (error: string) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      try {
        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          credentials
        );
        console.log(res);
        //navigate("/login");
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorResponse = err.response?.data as ErrorResponse;
          handleError(errorResponse.message);
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
          handleError("Something went wrong");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          handleError("Something went wrong");
        }
      }
    } else {
      navigate("/login");
    }
  };

  const passwordMatch = () => {
    if (credentials.password !== credentials.repeatPassword) {
      return <p style={{ color: "red" }}>Passwords don´t match</p>;
    }
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleLogin} className="form-container">
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          placeholder="Username"
          id="email"
          onChange={handleChange}
        />
        {passwordMatch()}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          id="repeatPassword"
          onChange={handleChange}
        />
        <button className="login-btn" type="submit">
          Register
        </button>
      </form>
      <h4>
        already have an account? Go to <Link to="/login">Login</Link>
      </h4>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default Register;
