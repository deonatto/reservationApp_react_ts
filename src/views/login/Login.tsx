import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ErrorResponse, User } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
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
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      try {
        const res = await axios.post(
          "http://localhost:8800/api/auth/login",
          credentials
        );
        dispatch(authActions.login(res.data.details as User));
        navigate("/");
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
      navigate("/");
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <h2>
        <Link to="/" className="link">
          Back to Home
        </Link>
      </h2>
      <div className="form-container">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="login-form-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="login-form-input"
        />
        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
        {errorMsg && <span>{errorMsg}</span>}
      </div>
      <h4>
        Don't have an account? Go to <Link to="/register">Register</Link>
      </h4>
    </div>
  );
};

export default Login;
