import React, { useState } from 'react';
import "./ProfileUpdationPage.css";
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

const ProfileUpdationPage = () => {
    const [fullName, setFullName] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const navigate = useNavigate();
    const navigateToHomePage = () =>{
        navigate("/home");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
                method: "POST", 
                body: JSON.stringify({
                    idToken: localStorage.getItem("idToken"),
                    displayName: fullName, 
                    photoUrl: profileUrl,
                    "premiumUser": false  
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log("Response from updation:", response);
                alert("Profile updated successfully");
                navigateToHomePage();
            } else {
                const errorData = await response.json();
                console.error("Profile updation failed:", errorData);
                alert("Profile updation failed");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("An error occurred during profile updation");
        }
    };

    return (
        <>
            <Header />
            
            <div className="profile-updation-form">
                <h2>Profile Updation</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profileUrl">Profile URL</label>
                        <input
                            type="text"
                            id="profileUrl"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default ProfileUpdationPage;
