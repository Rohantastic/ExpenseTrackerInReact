import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/ExpenseReducer';

const Navbar = () => {
  const premiumButton = useSelector(state => state.expense.premiumButton);
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); //to check for verified user
  const [darkmode, setDarkmode] = useState(false);
  //const darkmode = useSelector(state => state.darkmode);
  const [theme, setTheme] = useState("light-mode");
  const checkboxRef = useRef(null);
  const [expenses, setExpenses] = useState([]);

  
  // Function to handle checkbox changes
  const handleCheckboxChange = () => {
    if (checkboxRef.current.checked) {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };




  useEffect(() => {
    document.body.className = theme;
  }, [theme]);



  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    console.log("Logged Out");
    navigate("/login");
  }

  const premiumHandler = async () => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("idToken"),
          photoUrl: "true",
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        dispatch(expenseActions.deactivatePremium());
        
        alert("You're a premium user!");
      } else {
        const errorData = await response.json();
        console.error("Profile updation failed:", errorData);
        alert("Profile updation failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("idToken"),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
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
  };

  //doing email verification check + premium user verification
  const checkEmailVerification = async () => {
    try {
      const responseOfFetch = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCC0VjOlGiP9AhJi_tof2grQMe-B0T1-lU", {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("idToken"),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await responseOfFetch.json();

      console.log("data", data.users[0].photoUrl);
      if (data.users[0].photoUrl === "true") { //photoURL to check if user is premium or not!
        console.log("inside checking of true value of premium");
        setDarkmode(true);
        dispatch(expenseActions.deactivatePremium());
      } else {
        setDarkmode(false);
        
      }
      if (data.users[0].emailVerified) { //photoURL to check if user is verified or not!
        setIsVerified(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkEmailVerification();
  }, [premiumButton]);

  useEffect(() => {
    
    checkEmailVerification();
  }, [])


  console.log("The value of premium button is: ", premiumButton);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://expense-tracker-7fa84-default-rtdb.firebaseio.com/expensetracker.json");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const expensesArray = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            const emailExpenser = localStorage.getItem("emailExpenser");
            let filteredExpenses = expensesArray.filter((expense) => expense.email === emailExpenser);
            setExpenses(filteredExpenses);
          } else {
            setExpenses([]);
          }
        } else {
          console.error("Error fetching expenses from Firebase");
        }
      } catch (err) {
        console.error("An error occurred while fetching expenses:", err);
      }
    };

    fetchData();
  }, []);


  const downloadExpenseButton = async () =>{

    

    const csv = expenses.map((expense) => Object.values(expense).join(',')).join('\n');
    const csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);

    const link = document.createElement('a');
    link.setAttribute('href', csvData);
    link.setAttribute('download', 'expenses.csv');
    link.click();
  }

  return (
    <>
      <nav className='navbar-div'>
        <NavLink to="/"> 𝔈𝔗 </NavLink>
        {isVerified ? null : <NavLink onClick={handleVerifyEmail}> Verify Email </NavLink>}
        {premiumButton && <NavLink onClick={premiumHandler} className="premium-button"> Premium </NavLink>}
        <button className='navbar-logout-button' onClick={logoutHandler}>Log Out</button>
        {darkmode && (
          <div>
            <label className="switch">
              <input type="checkbox" ref={checkboxRef} onChange={handleCheckboxChange} />
              <span className="slider round"></span>
            </label>
            <button className="navbar-download-btn" onClick={downloadExpenseButton}><i className="fa fa-download"></i> Download</button>
          </div>
        )}

      </nav>
    </>
  )
}

export default Navbar;
