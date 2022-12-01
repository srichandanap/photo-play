import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    photo: string;
    favourites: any;
}

const initialState = {
    photo: [],
    favourites: JSON.parse(localStorage.getItem("fav") || "[]"),
}

const PhotoSlice = createSlice({
    name: 'photoVideos',
    initialState,
    reducers: {
        AddPhoto: (state: any, {payload}: any) => {
            state.photo = payload;
            // console.log("2", state)
        },

        AddFovourites: (state: any, { payload }) => {
            state.photos.favourites.push(payload);
            localStorage.setItem("fav", JSON.stringify(state.photos.favourites));
            // window.location.reload();
        }
    },
    // extraReducers: {
    //     [getWeatherData.fulfilled]: (state : any, action: any) =>{
    //         return action.payload.weather;
    //     }
    // }
});

export const { AddPhoto } = PhotoSlice.actions;
export default PhotoSlice.reducer;