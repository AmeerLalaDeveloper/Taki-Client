import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    connectedUsers: [],
}

const connectedUsersSlices = createSlice({
    name: "connected users",
    initialState,
    reducers: {

        setConnectedUsers: (state, action) => {
            state.connectedUsers = action.payload.connectedUsers
        },

    },


})


//generate the action creators
export const { setConnectedUsers } = connectedUsersSlices.actions
//export reducers
export default connectedUsersSlices.reducer;