import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from "./ExpenseReducer";
import darkmodeSlice from "./darkModeReducer";

const store = configureStore({
    reducer:{
        auth: authSlice,
        expense: expenseSlice,
        darkmode: darkmodeSlice
    }
});

export default store;