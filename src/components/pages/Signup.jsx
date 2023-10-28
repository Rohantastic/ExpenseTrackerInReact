import React, { useState } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./Signup.css";
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3QXuWLXotdtPsh5kedc-Bo3j283kD6T8", {
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
                alert("User has been created !!");
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
                    <h2>SignUp</h2>
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
                    <button onClick={handleLogin}>Signup</button>
                    <NavLink to="/">Don't have an account?</NavLink>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
