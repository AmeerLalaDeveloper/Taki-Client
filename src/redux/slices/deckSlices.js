import { createSlice } from "@reduxjs/toolkit";
import shuffledDeck from "../../Utilities/Deck";

//Intial State
const initialState = {
    deck: [...shuffledDeck],
}
const deckSlices = createSlice({
    name: "deck",
    initialState,
    reducers: {

        setDeck: (state, action) => {
            state.deck = action.payload.deck
        },

    },
    extraReducers: (builder) => {

        // builder.addCase()
    }

})


//generate the action creators
export const { setDeck, deleteLastCard } = deckSlices.actions
//export reducers
export default deckSlices.reducer;