import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    firstPlayedCard: '',
}
const firstPlayedCardSlices = createSlice({
    name: "firstplayedcard",
    initialState,
    reducers: {

        setFirstPlayedCard: (state, action) => {
            state.deck = action.payload.deck
        },

    },
    extraReducers: (builder) => {

        // builder.addCase()
    }

})


//generate the action creators
export const { setFirstPlayedCard } = firstPlayedCardSlices.actions
//export reducers
export default firstPlayedCardSlices.reducer;