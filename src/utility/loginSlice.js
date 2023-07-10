import { createSlice } from "@reduxjs/toolkit";





const loginSlice= createSlice({

    name:'login',
    initialState:{
        status:false
    },

    reducers:{
        setLoginStatus:(state,action)=>{
            state.status=action.payload;
        }
    }
})


export default loginSlice.reducer ;
export const{setLoginStatus} = loginSlice.actions