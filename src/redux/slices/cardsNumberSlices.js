import { createSlice } from "@reduxjs/toolkit";
const EACH_PLAYER_CARDS = 8

//Intial State
const initialState = {
    cardsNumber: EACH_PLAYER_CARDS
}
const cardsNumberSlices = createSlice({
    name: "cardsNumber",
    initialState,
    reducers: {

        setCardsNumber: (state, action) => {
            state.cardsNumber = action.payload
        }

    },
    extraReducers: (builder) => {

        // builder.addCase()
    }

})


//generate the action creators
export const { setCardsNumber } = cardsNumberSlices.actions
//export reducers
export default cardsNumberSlices.reducer;