import React, { useState } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./Login.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/AuthReducer';


const LoginPage = () => {
     
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const navigateToHomePage = ()=>{
        navigate("/home");
    }
    const handleLogin = async () => {

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const idToken = data.idToken;
                localStorage.setItem("idToken",idToken);
                localStorage.setItem("emailExpenser",email);
                console.log("data", idToken);

                if(data.profilePicture){
                    localStorage.setItem("isProfileUpdated",true);
                }else{
                    localStorage.setItem("isProfileUpdated",false);
                }
                
                alert("User has been successfully logged in !!");
                dispatch(authActions.authToken(data.idToken));
                dispatch(authActions.loggedIn());
                navigateToHomePage();
            } else {
                alert("Problem is user Creation")
            }
        } catch (err) {
            alert(err);
        }

    };


    return (
        <>
            
            <div className="login-container">
                <div className="login-form">
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleLogin}>Login</button>
                    <br/>
                    <NavLink to="/">Don't have an account?</NavLink>
                    <br/>
                    <NavLink to="/forgotPassword">Forgot Password?</NavLink>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
