import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    songs: [],
    isLoading: false,
    error: null,
    current: null,
};

export const songSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        getSongs: (state, action) => {
            state.isLoading = true;
        },
        getSongSuccess: (state, action) => {
            state.songs = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        createSong: (state, action) => {
            state.isLoading = true;
            state.current = action.payload.id;
        },
        createSongSuccess: (state, action) => {
            state.songs.push(action.payload);
            state.isLoading = false;
            state.current = null;
            toast.success("Song added successfully");
        },
        deleteSong: (state, action) => {
            state.isLoading = true;
            state.current = action.payload;
        },
        deleteSongSuccess: (state, action) => {
            state.songs = state.songs.filter(
                (song) => song.id !== action.payload
            );
            state.isLoading = false;
            state.current = null;
            toast.success("Song deleted successfully");
        },
        updateSong: (state, action) => {
            state.isLoading = true;
            state.current = action.payload.id;
        },
        updateSongSuccess: (state, action) => {
            const songIndex = state.songs.findIndex(
                (song) => song.id === action.payload.id
            );
            state.songs[songIndex] = action.payload;
            state.isLoading = false;
            state.current = null;
            toast.success("Song updated successfully");
        },
        songFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            toast.error("ERROR: Something Went Wrong!");
        },
    },
});

export const {
    getSongs,
    getSongSuccess,
    createSong,
    createSongSuccess,
    deleteSong,
    deleteSongSuccess,
    updateSong,
    updateSongSuccess,
    songFailure,
} = songSlice.actions;

export default songSlice.reducer;
