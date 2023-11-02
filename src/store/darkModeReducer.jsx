import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false
}

const darkmodeSlice = createSlice({
    name:'darkmode',
    initialState:initialState,
    reducers:{
        darkmodeOn(state){
            state.darkMode = true
        },
        darkmodeOff(state){
            state.darkMode = false
        }
    }
});

export const darkmodeActions = darkmodeSlice.actions;

export default darkmodeSlice.reducer;