import { createSlice } from "@reduxjs/toolkit";




const dataSlice = createSlice({

    name:'products',
    initialState:{
        items:[]
    },
    reducers:{
        storeData:(state,action)=>{

            state.items=action.payload;
        }
    }

})


export default dataSlice.reducer ;
export const{storeData} = dataSlice.actions