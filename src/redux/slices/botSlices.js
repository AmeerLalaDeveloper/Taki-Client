import { createSlice } from "@reduxjs/toolkit";
//Intial State
const initialState = {
    bot: {},
}
const bot = createSlice({
    name: "bot",
    initialState,
    reducers: {

        setBot: (state, action) => {
            state.bot = action.payload.bot
        },
        addCardForBot: (state, action) => {
            state.bot = [...state.bot, action.payload.card]
        }
    },

})


//generate the action creators
export const { setBot, addCardForBot } = bot.actions
//export reducers
export default bot.reducer;