import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import "./Navbar.css";
import { useSelector } from 'react-redux';


const Navbar = () => {

  const premiumButton = useSelector(state=>state.expense.premiumButton);
  const navigate = useNavigate();

  const logoutHandler = () =>{
    localStorage.clear();
    console.log("Logged Out");
    navigate("/login");
  }

  const premiumHandler = ()=>{
    console.log("in premium handler");
  }
  return (
    <>

        <nav className='navbar-div'>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/product"> Products </NavLink>
            {premiumButton && <NavLink onClick={premiumHandler}> Premium </NavLink>}
            <button onClick={ logoutHandler}>Log Out</button>
        </nav>
    
    </>
  )
}

export default Navbar;