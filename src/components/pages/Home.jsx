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

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        setExpenses([...expenses,expenseData]);

        setExpenseData({
            moneySpent: "",
            description: "",
            category: "Food",
        });
        console.log("Expense data:", expenseData);
    };

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
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

            {/* Expense Entry Form */}
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
                            <strong>Category:</strong> {expense.category}, <strong>Money Spent:</strong> ${expense.moneySpent}, <strong>Description:</strong> {expense.description}
                        </li>
                    ))}
                </ul>
            </div>
            
            <Footer />
        </>
    );
};

export default Home;
