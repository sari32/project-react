import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    currentUser: null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state, action)=>{
            state.currentUser=action.payload;
            axios.defaults.headers.common["authorization"]=action.payload.token;
            localStorage.setItem("currentUser",JSON.stringify(state.currentUser));
        },
        userOut:(state)=>{
            state.currentUser=null;
            axios.defaults.headers.common["authorization"]=null;
            localStorage.clear();
        }
    }
})

export const {userIn, userOut}=userSlice.actions;
export default userSlice.reducer;