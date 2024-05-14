import { createSlice } from '@reduxjs/toolkit';

export const playbackSlice = createSlice({
  name: 'playback',
  initialState: {
    currentPlaying: null,
  },
  reducers: {
    playSong: (state, action) => {
      state.currentPlaying = action.payload;
    },
    stopSong: (state) => {
      state.currentPlaying = null;
    },
  },
});

export const { playSong, stopSong } = playbackSlice.actions;
export default playbackSlice.reducer;
