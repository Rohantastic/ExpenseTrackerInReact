import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from '../common/Header';
import Footer from '../common/Footer';

const Home = () => {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
    }, [showNotification]);

    const handleVerifyEmail = async () => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: localStorage.getItem("idToken")
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                alert("Verification Code has been sent to your email");
            } else {
                const errorData = await response.json();
                alert("Email verification request failed: " + JSON.stringify(errorData));
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />

            {showNotification && (
                <div className="notification">
                    Your profile is incomplete
                    <button onClick={() => setShowNotification(false)}>
                        <Link to="/ProfileUpdation">Complete Now</Link>
                    </button>
                </div>
            )}

            <button onClick={handleVerifyEmail}>Verify Email</button>
            <Footer />
        </>
    );
};

export default Home;
