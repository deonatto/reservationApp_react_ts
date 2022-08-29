import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { User } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Login = () => {
  const [credentials, setCredentials] = useState<User>({
    username: "",
    password: "",
  });
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    //need square brackets in object property to tell that this refers to dynamic key
    setCredentials(prevState =>(
        {...prevState, [e.target.id]: e.target.value}
    ))
  };
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:8800/api/auth/login",credentials);
        console.log(res);
    }catch(err: unknown){
        if(axios.isAxiosError(err)){
          console.log(err);
        }
    }
  }
  return (
    <div className="login-container">
      <div className="form-container">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="login-form-input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="login-form-input"
        />
        <button onClick={handleLogin} className="login-btn">Login</button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
