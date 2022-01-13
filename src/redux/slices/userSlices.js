import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    user: null,
}

const userSlices = createSlice({
    name: "users",
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload.user
        },

    },


})


//generate the action creators
export const { setUser } = userSlices.actions
//export reducers
export default userSlices.reducer;