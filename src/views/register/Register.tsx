import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../types/types";
import { useAppSelector } from "../../redux/hooks";
import "../login/Login.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
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

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    //if user is not loggedIn allow to register, else send to home page
    if (!isLoggedIn) {
      e.preventDefault();
      try {
        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          credentials
        );
        //send to login
        navigate("/login");
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

  const passwordMatch = () => {
    if (credentials.password !== credentials.repeatPassword) {
      return <p style={{ color: "red" }}>Passwords don´t match</p>;
    }
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={registerHandler} className="form-container">
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          onChange={changeHandler}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          placeholder="Username"
          id="email"
          onChange={changeHandler}
        />
        {passwordMatch()}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={changeHandler}
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          id="repeatPassword"
          onChange={changeHandler}
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
