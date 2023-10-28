import React, { useState } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./Login.css";
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                alert("User has been successfully logged in !!");
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
            <Header />
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
