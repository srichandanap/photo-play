import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    photo: string;
    video: string;
    favourites: any;
    favouritesVideo: any;
}

const initialState = {
    photo: [],
    video: [],
    favourites: JSON.parse(localStorage.getItem("fav") || "[]"),
    favouritesVideo: JSON.parse(localStorage.getItem("favVideo") || "[]"),
}

const PhotoSlice = createSlice({
    name: 'photoVideos',
    initialState,
    reducers: {
        AddPhoto: (state: any, { payload }: any) => {
            state.photo = payload;
            // console.log("2", state)
        },

        AddVideo: (state: any, { payload }: any) => {
            state.video = payload;
            // window.location.reload();
        },

        AddFovourites: (state: any, { payload }) => {
            state.photos.favourites.push(payload);
            localStorage.setItem("fav", JSON.stringify(state.photos.favourites));
            window.location.reload();
        },


        AddFovouritesVideos: (state: any, { payload }) => {
            state.video.favouritesVideo.push(payload);
            localStorage.setItem("favVideo", JSON.stringify(state.video.favouritesVideo));
            window.location.reload();
        },


    },

});

export const { AddPhoto, AddVideo, AddFovouritesVideos } = PhotoSlice.actions;
export default PhotoSlice.reducer;