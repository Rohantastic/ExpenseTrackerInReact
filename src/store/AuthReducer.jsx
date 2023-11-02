import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInStatus: false,
    token : null,
    emailVerified : false
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
        },
        isEmailVerified(state){
            state.emailVerified = !state.emailVerified;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;