import { configureStore } from "@reduxjs/toolkit";
import playbackReducer from './slices/playbackSlice';
import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        fav: favSlice,
        playback: playbackReducer,
    },
})

export default store;
