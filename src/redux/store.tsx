import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./photoSlice";

const store = configureStore({
    reducer:{
        photoVideos: photoReducer,
    },
});

export default store;