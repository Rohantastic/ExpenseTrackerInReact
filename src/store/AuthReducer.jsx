import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInStatus: false,
    token : null
}

const authSlice = createSlice({
    name:'authorization',
    initialState:initialState,
    reducers:{
        loggedIn(state){
            state.loggedInStatus = true;
        },
        loggedOut(state){
            state.loggedInStatus = false;
        },
        authToken(state,action){
            state.token = action.payload; 
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;