import React, { useState } from 'react';
import "./ForgetPasswordPage.css";
import Header from '../common/Header';
import Footer from '../common/Footer';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email,
                }),
            })
                .then((response) => {
                    console.log("Password reset email sent successfully!");
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    setLoading(false);
                });
        }, 1000);
    };

    return (
        <>
            <Header />
            <div className="forget-password-container">
                <h2>Forget Password</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>

                {loading && <div className="loader">Loading...</div>}
            </div>
            <Footer />
        </>
    );
}

export default ForgetPasswordPage;
