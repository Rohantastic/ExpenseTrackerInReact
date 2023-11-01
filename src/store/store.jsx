import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from "./ExpenseReducer";

const store = configureStore({
    reducer:{
        auth: authSlice,
        expense: expenseSlice,
    }
});

export default store;