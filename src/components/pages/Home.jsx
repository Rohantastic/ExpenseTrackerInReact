import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from '../common/Header';
import Footer from '../common/Footer';

const Home = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [expenses,setExpenses] = useState([]);

    const [expenseData, setExpenseData] = useState({
        moneySpent: "",
        description: "",
        category: "Food", 
    });

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({
            ...expenseData,
            [name]: value,
        });
    };

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("https://expense-tracker-7fa84-default-rtdb.firebaseio.com/expensetracker.json", {
                method: "POST",
                body: JSON.stringify({
                    category: expenseData.category,
                    money: expenseData.moneySpent,
                    description: expenseData.description,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                
                console.log("Expense data sent to Firebase.");
            } else {
                const errorData = await response.json();
                console.error("Error sending expense data to Firebase: " + JSON.stringify(errorData));
            }
        } catch (err) {
            console.error("An error occurred:", err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await fetch("https://expense-tracker-7fa84-default-rtdb.firebaseio.com/expensetracker.json");
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    // Convert Firebase data object to an array
                    const expensesArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setExpenses(expensesArray);
                } else {
                    setExpenses([]); // No expenses in Firebase
                }
            } else {
                console.error("Error fetching expenses from Firebase");
            }
        } catch (err) {
            console.error("An error occurred while fetching expenses:", err);
        }
    };

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
        fetchExpenses();
    }, [showNotification]);

    const handleVerifyEmail = async () => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY", {
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
            <form className="form-container" onSubmit={handleExpenseSubmit}>
                <h2>Expense Entry</h2>
                <label>
                    Money Spent:
                    <input
                        type="number"
                        name="moneySpent"
                        value={expenseData.moneySpent}
                        onChange={handleExpenseChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={expenseData.description}
                        onChange={handleExpenseChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Category:
                    <select
                        name="category"
                        value={expenseData.category}
                        onChange={handleExpenseChange}
                    >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        
                    </select>
                </label>
                <br />
                <button type="submit">Submit Expense</button>
            </form>
            
            <div className="expense-list">
                <h2>Expenses</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <strong>Category:</strong> {expense.category}, <strong>Money Spent:</strong> ${expense.money}, <strong>Description:</strong> {expense.description}
                        </li>
                    ))}
                </ul>
            </div>

            <Footer />
        </>
    );
};

export default Home;
