import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ErrorResponse, User } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  //get users login status
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //need square brackets in object property to tell that this refers to dynamic key
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const errorHandler = (error: string) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    //if user is not loggedIn allow to login, else send to home page
    if (!isLoggedIn) {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          credentials
        );
        //dispatch action to update redux state
        dispatch(authActions.login(res.data.details as User));
        //send to home page
        navigate("/");
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorResponse = err.response?.data as ErrorResponse;
          errorHandler(errorResponse.message);
        }else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          errorHandler("Something went wrong");
        }
      }
    } else {
      //send to home page
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
      <form className="form-container" onSubmit={loginHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={changeHandler}
          className="login-form-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={changeHandler}
          className="login-form-input"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <h4>
        Don't have an account? Go to <Link to="/register">Register</Link>
      </h4>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default Login;
