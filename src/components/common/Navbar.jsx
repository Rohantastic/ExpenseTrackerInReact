import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () =>{
    localStorage.clear();
    console.log("Logged Out");
    navigate("/login");
  }
  return (
    <>

        <nav className='navbar-div'>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/product"> Products </NavLink>
            <NavLink to="/about"> About US </NavLink>
            <button onClick={ logoutHandler}>Log Out</button>
        </nav>
    
    </>
  )
}

export default Navbar;