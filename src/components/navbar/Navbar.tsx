import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

  const logOutHandler = () =>{
    dispatch(authActions.logout())
  }

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link className="link" to="/">
          <h1>BookingApp</h1>
        </Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="navbar-btn" onClick={logOutHandler}>Logout</button>
        ) : (
          <React.Fragment>
            <button className="navbar-btn" onClick={()=> navigate("register")}>Register</button>
            <button className="navbar-btn" onClick={()=> navigate("login")}>login</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;
