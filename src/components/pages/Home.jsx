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

      <Footer />
    </>
  );
};

export default Home;
