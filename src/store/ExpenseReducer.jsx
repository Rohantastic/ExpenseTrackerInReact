import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    expenses : [],
    premiumButton: false
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialState,
    reducers:{
        addExpense(state,action){
            state.expenses.push(action.payload);
        },
        activatePremium(state){
            state.premiumButton = true;
        },
        deactivatePremium(state){
            state.premiumButton = false;
        }
    }
});


export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;