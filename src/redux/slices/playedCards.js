import { createSlice } from "@reduxjs/toolkit";
import shuffledDeck from "../../Utilities/Deck";
let initValue = null
for (let i = shuffledDeck.length - 1; i >= 0; i--) {
    if (shuffledDeck[i].card >= '1' && shuffledDeck[i].card <= '9') {
        initValue = shuffledDeck[i]
        break;
    }
}


//Intial State
const initialState = {
    playedCards: [initValue],
}
const playedCards = createSlice({
    name: "playedCards",
    initialState,
    reducers: {

        setPlayedCards: (state, action) => {
            state.playedCards = [...state.playedCards, action.payload.playedCards]
        },

    },

})


//generate the action creators
export const { setPlayedCards, setCardsNumber } = playedCards.actions
//export reducers
export default playedCards.reducer;