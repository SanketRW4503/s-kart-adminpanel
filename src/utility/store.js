import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import dataSlice from "./dataSlice";




const store= configureStore({
    reducer:{
        login:loginSlice,
       products:dataSlice
    }
})


export default store;