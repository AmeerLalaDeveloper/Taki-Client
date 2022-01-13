import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    token: '',
}
const tokenSlices = createSlice({
    name: "tokens",
    initialState,
    reducers: {

        setToken: (state, action) => {
            state.token = action.payload.token
        },

    },
    extraReducers: (builder) => {

        // builder.addCase()
    }

})


//generate the action creators
export const { setToken } = tokenSlices.actions
//export reducers
export default tokenSlices.reducer;