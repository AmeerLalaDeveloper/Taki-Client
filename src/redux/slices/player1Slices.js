import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    player: [],
}
const player = createSlice({
    name: "player",
    initialState,
    reducers: {

        setPlayer: (state, action) => {
            state.player = action.payload.player
        },
        addCardForPlayer: (state, action) => {
            state.player = [...state.player, action.payload.card]
        }

    },

})


//generate the action creators
export const { setPlayer, addCardForPlayer } = player.actions
//export reducers
export default player.reducer;