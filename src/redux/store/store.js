import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlices";
import tokenReducer from "../slices/tokenSlices";
import connectedUsersSlices from '../slices/connectusersSlices'

const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        connectedUsersSlices: connectedUsersSlices
    },
    
})

export default store