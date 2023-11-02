import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from '../common/Header';
import Footer from '../common/Footer';
import { expenseActions } from '../../store/ExpenseReducer';
import { useDispatch } from 'react-redux';

const Home = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [expenses, setExpenses] = useState([]);
    const [expenseData, setExpenseData] = useState({
        moneySpent: "",
        description: "",
        category: "Food",
    });

    useEffect(() => {
        
    }, []);
    const dispatch = useDispatch();

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
                    email: localStorage.getItem("emailExpenser")
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

    useEffect(() => {
        if(localStorage.getItem("isProfileUpdated")){
            setShowNotification(false);
        }else{
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
        fetchExpenses();
    }, [showNotification]);

    




    const handleDeleteExpense = async (expenseId) => {
        try {
            const response = await fetch(`https://expense-tracker-7fa84-default-rtdb.firebaseio.com/expensetracker/${expenseId}.json`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchExpenses();
            } else {
                const errorData = await response.json();
                console.error("Error deleting expense: " + JSON.stringify(errorData));
            }
        } catch (err) {
            console.error("An error occurred while deleting the expense:", err);
        }
    };

    
    var expenseAmountCount = 0;
    for (var i = 0; i < expenses.length; i++) {
        expenseAmountCount += +expenses[i].money;
    }

    console.log("expenseAmount count?: ", expenseAmountCount);

    if (expenseAmountCount >= 1000) {
        dispatch(expenseActions.activatePremium());
    }else{
        dispatch(expenseActions.deactivatePremium());
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

            
            <div className="form-input-container">
                <form className="form-container" onSubmit={handleExpenseSubmit}>
                    <h2>𝕰𝖝𝖕𝖊𝖓𝖘𝖊 𝕿𝖗𝖆𝖈𝖐𝖊𝖗</h2>
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
                            <option value="Salary">Groceries</option>
                            <option value="Others">Others</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Submit Expense</button>
                </form>
            </div>

            <br />
            <hr />
            
            <div className="expense-list">
                <h2>Expenses</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <strong>Category:</strong> {expense.category}, <strong>Money Spent:</strong> ${expense.money}, <strong>Description:</strong> {expense.description}
                            <button className='expense-delete-button' onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <Footer />
        </>
    );
};

export default Home;
