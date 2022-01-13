import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    turn: null,
}

const userTurnSlices = createSlice({
    name: "users",
    initialState,
    reducers: {

        setTurn: (state, action) => {
            state.user = action.payload.turn
        },

    },


})


//generate the action creators
export const { setTurn } = userTurnSlices.actions
//export reducers
export default userTurnSlices.reducer;