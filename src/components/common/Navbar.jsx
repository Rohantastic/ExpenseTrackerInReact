import React from 'react'
import {NavLink} from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
    <>

        <nav className='navbar-div'>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/product"> Products </NavLink>
            <NavLink to="/about"> About US </NavLink>
        </nav>
    
    </>
  )
}

export default Navbar